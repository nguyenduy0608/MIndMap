import { fillParent, refreshIds, unionTopics } from './utils/index'
import { findEle, createExpander, shapeTpc, createComment } from './utils/dom'
import { deepClone } from './utils/index'
import type { Topic } from './types/dom'
import type { MindElixirInstance, NodeObj } from './types/index'
import { insertNodeObj, insertParentNodeObj, moveUpObj, moveDownObj, removeNodeObj, moveNodeObj } from './utils/objectManipulation'
import { addChildDom, addChildDomExpand, realAddChild, removeNodeDom } from './utils/domManipulation'

const typeMap: Record<string, InsertPosition> = {
  before: 'beforebegin',
  after: 'afterend',
}

export const mainToSub = function (tpc: Topic) {
  const mainNode = tpc.parentElement.parentElement
  const lc = mainNode.lastElementChild
  if (lc?.tagName === 'svg') lc?.remove() // clear svg group of main node
}

export const reshapeNode = function (this: MindElixirInstance, tpc: Topic, patchData: NodeObj) {
  const nodeObj = tpc.nodeObj
  const origin = deepClone(nodeObj)
  // merge styles
  if (origin.style && patchData.style) {
    patchData.style = Object.assign(origin.style, patchData.style)
  }
  const newObj = Object.assign(nodeObj, patchData)
  shapeTpc(tpc, newObj)
  this.linkDiv()
  this.bus.fire('operation', {
    name: 'reshapeNode',
    obj: newObj,
    origin,
  })
}

// const addChildFunc = function (mei: MindElixirInstance, tpc: Topic, node?: NodeObj) {
//   if (!tpc) return null
//   const nodeObj = tpc.nodeObj
//   if (nodeObj.expanded === false) {
//     mei.expandNode(tpc, true)
//     // dom had resetted
//     tpc = findEle(nodeObj.id) as Topic
//   }
//   const newNodeObj = node || mei.generateNewObj()
//   if (nodeObj.children) nodeObj.children.push(newNodeObj)
//   else nodeObj.children = [newNodeObj]
//   fillParent(mei.nodeData)

//   const { grp, top: newTop } = mei.createWrapper(newNodeObj)
//   addChildDom(mei, tpc, grp)
//   return { newTop, newNodeObj }
// }

export const insertSibling = function (this: MindElixirInstance, type: 'before' | 'after', el?: Topic, node?: NodeObj) {
  const nodeEle = el || this.currentNode
  if (!nodeEle) return
  const nodeObj = nodeEle.nodeObj
  if (nodeObj.root === true) {
    this.addChild()
    return
  } else if (nodeObj.parent?.root === true && nodeObj.parent?.children?.length === 1) {
    this.addChild(findEle(nodeObj.parent!.id), node)
    return
  }
  let newNodeObj: any = node || this.generateNewObj()
  console.log('🚀 ~ insertSibling ~ nodeObj:', nodeObj)

  newNodeObj = {
    ...newNodeObj,
    direction: nodeObj?.direction,
    style: nodeObj?.style,
  }
  insertNodeObj(newNodeObj, type, nodeObj)
  fillParent(this.nodeData)
  const t = nodeEle.parentElement

  const { grp, top } = this.createWrapper(newNodeObj)

  t.parentElement.insertAdjacentElement(typeMap[type], grp)

  this.linkDiv(grp.offsetParent)

  if (!node) {
    this.editTopic(top.firstChild)
  }
  this.selectNode(top.firstChild, true)

  this.bus.fire('operation', {
    name: 'insertSibling',
    type,
    obj: newNodeObj,
    nodeObj: nodeObj,
  })
}

export const addChildExpand = function (this: MindElixirInstance, el?: Topic, node?: NodeObj) {
  const nodeEle = el || this.currentNode
  if (!nodeEle) return
  const res = addChildDomExpand(this, nodeEle, node)
  if (!res) return
  const { newTop, newNodeObj } = res
  console.log('🚀 ~ addChildExpand ~ newNodeObj:', newNodeObj)
  this.bus.fire('operation', {
    name: 'addChildExpand',
    obj: newNodeObj,
  })
  if (!node) {
    this.editTopic(newTop.firstChild)
  }
  this.selectNode(newTop.firstChild, true)
}
export const insertParent = function (this: MindElixirInstance, el?: Topic, node?: NodeObj) {
  const nodeEle = el || this.currentNode
  if (!nodeEle) return
  mainToSub(nodeEle)
  const nodeObj = nodeEle.nodeObj
  if (nodeObj.root === true) {
    return
  }
  const newNodeObj = node || this.generateNewObj()
  insertParentNodeObj(nodeObj, newNodeObj)
  fillParent(this.nodeData)

  const grp0 = nodeEle.parentElement.parentElement
  console.time('insertParent_DOM')
  const { grp, top } = this.createWrapper(newNodeObj, true)
  top.appendChild(createExpander(true))
  // top.appendChild(createComment(true, newNodeObj))
  grp0.insertAdjacentElement('afterend', grp)

  const c = this.createChildren([grp0])
  top.insertAdjacentElement('afterend', c)

  this.linkDiv()

  if (!node) {
    this.editTopic(top.firstChild)
  }
  this.selectNode(top.firstChild, true)
  console.timeEnd('insertParent_DOM')
  this.bus.fire('operation', {
    name: 'insertParent',
    obj: newNodeObj,
  })
}

export const addChild = function (this: MindElixirInstance, el?: Topic, node?: NodeObj) {
  console.time('addChild')
  const nodeEle = el || this.currentNode
  if (!nodeEle) return
  const res = addChildDom(this, nodeEle, node)
  if (!res) return
  const { newTop, newNodeObj } = res

  this.bus.fire('operation', {
    name: 'addChild',
    obj: newNodeObj,
  })
  this.editTopic(newTop.firstChild)

  // if (!node) {
  //   this.editTopic(newTop.firstChild)
  // }
  this.selectNode(newTop.firstChild, true)
}

export const copyNode = function (this: MindElixirInstance, node: Topic, to: Topic) {
  console.time('copyNode')
  const deepCloneObj = deepClone(node.nodeObj)
  refreshIds(deepCloneObj)
  const res = addChildDom(this, to, deepCloneObj)
  if (!res) return
  const { newNodeObj } = res
  console.timeEnd('copyNode')
  this.selectNode(findEle(newNodeObj.id))
  this.bus.fire('operation', {
    name: 'copyNode',
    obj: newNodeObj,
  })
}

export const copyNodes = function (this: MindElixirInstance, tpcs: Topic[], to: Topic) {
  tpcs = unionTopics(tpcs)
  const objs = []
  for (let i = 0; i < tpcs.length; i++) {
    const node = tpcs[i]
    const deepCloneObj = deepClone(node.nodeObj)
    refreshIds(deepCloneObj)
    const res = addChildDom(this, to, deepCloneObj)
    if (!res) return
    const { newNodeObj } = res
    objs.push(newNodeObj)
  }
  this.selectNodes(objs.map(obj => findEle(obj.id)))
  this.bus.fire('operation', {
    name: 'copyNodes',
    objs,
  })
}

export const moveUpNode = function (this: MindElixirInstance, el?: Topic): { currentIndex: number; swappedIndex: number; obj: NodeObj } | void {
  const nodeEle = el || this.currentNode
  if (!nodeEle) return
  const obj = nodeEle.nodeObj
  const result = moveUpObj(obj)
  const grp = nodeEle.parentNode.parentNode
  grp.parentNode.insertBefore(grp, grp.previousSibling)
  this.linkDiv()
  this.bus.fire('operation', {
    name: 'moveUpNode',
    obj,
    result,
  })
  return result
}

export const moveDownNode = function (this: MindElixirInstance, el?: Topic): { currentIndex: number; swappedIndex: number; obj: NodeObj } | void {
  const nodeEle = el || this.currentNode
  if (!nodeEle) return
  const obj = nodeEle.nodeObj
  const result = moveDownObj(obj)
  const grp = nodeEle.parentNode.parentNode
  if (grp.nextSibling) {
    grp.nextSibling.insertAdjacentElement('afterend', grp)
  } else {
    grp.parentNode.prepend(grp)
  }
  this.linkDiv()
  this.bus.fire('operation', {
    name: 'moveDownNode',
    obj,
    result,
  })
  return result
}

export const removeNode = function (this: MindElixirInstance, el?: Topic) {
  const tpc = el || this.currentNode
  if (!tpc) return
  const nodeObj = tpc.nodeObj
  if (nodeObj.root === true) {
    throw new Error('Can not remove root node')
  }
  const siblings = nodeObj.parent!.children!
  const i = siblings.findIndex(node => node === nodeObj)
  const siblingLength = removeNodeObj(nodeObj)
  removeNodeDom(tpc, siblingLength)

  // automatically select sibling or parent
  if (siblings.length !== 0) {
    const sibling = siblings[i] || siblings[i - 1]
    this.selectNode(findEle(sibling.id))
  } else {
    this.selectNode(findEle(nodeObj.parent!.id))
  }

  this.linkDiv()
  this.bus.fire('operation', {
    name: 'removeNode',
    obj: nodeObj,
    originIndex: i,
    originParentId: nodeObj?.parent?.id,
  })
}

export const removeNodes = function (this: MindElixirInstance, tpcs: Topic[]) {
  tpcs = unionTopics(tpcs)
  for (const tpc of tpcs) {
    const nodeObj = tpc.nodeObj
    if (nodeObj.root === true) {
      continue
    }
    const siblingLength = removeNodeObj(nodeObj)
    removeNodeDom(tpc, siblingLength)
  }
  this.linkDiv()
  this.bus.fire('operation', {
    name: 'removeNodes',
    objs: tpcs.map(tpc => tpc.nodeObj),
  })
}

export const moveNodeIn = function (this: MindElixirInstance, from: Topic[], to: Topic) {
  from = unionTopics(from)
  const toObj = to.nodeObj
  if (toObj.expanded === false) {
    // TODO
    this.expandNode(to, true)
    to = findEle(toObj.id) as Topic
  }
  // if (!checkMoveValid(obj, toObj)) {
  //   console.warn('Invalid move')
  //   return
  // }
  console.time('moveNodeIn')
  for (const f of from) {
    const obj = f.nodeObj
    moveNodeObj('in', obj, toObj)
    fillParent(this.nodeData) // update parent property
    const fromTop = f.parentElement
    realAddChild(this, to, fromTop.parentElement)
  }
  this.linkDiv()
  this.bus.fire('operation', {
    name: 'moveNodeIn',
    objs: from.map(f => f.nodeObj),
    toObj,
  })
  console.timeEnd('moveNodeIn')
}

const moveNode = (from: Topic[], type: 'before' | 'after', to: Topic, mei: MindElixirInstance) => {
  from = unionTopics(from)
  if (type === 'after') {
    from = from.reverse()
  }
  const toObj = to.nodeObj
  for (const f of from) {
    const obj = f.nodeObj
    moveNodeObj(type, obj, toObj)
    fillParent(mei.nodeData)
    mainToSub(f)
    const fromGrp = f.parentElement.parentNode
    const toGrp = to.parentElement.parentNode
    toGrp.insertAdjacentElement(typeMap[type], fromGrp)
  }
  mei.linkDiv()
  mei.bus.fire('operation', {
    name: type === 'before' ? 'moveNodeBefore' : 'moveNodeAfter',
    objs: from.map(f => f.nodeObj),
    toObj,
  })
}

export const moveNodeBefore = function (this: MindElixirInstance, from: Topic[], to: Topic) {
  moveNode(from, 'before', to, this)
}

export const moveNodeAfter = function (this: MindElixirInstance, from: Topic[], to: Topic) {
  moveNode(from, 'after', to, this)
}

export const beginEdit = function (this: MindElixirInstance, el?: Topic) {
  const nodeEle = el || this.currentNode
  if (!nodeEle) return
  if (nodeEle.nodeObj.dangerouslySetInnerHTML) return
  this.editTopic(nodeEle)
}

export const setNodeTopic = function (this: MindElixirInstance, el: Topic, topic: string) {
  el.text.textContent = topic
  el.nodeObj.topic = topic
  this.linkDiv()
}
