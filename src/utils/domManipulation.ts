import { fillParent, getRandomColor } from '.'
import { LEFT, RIGHT, SIDE } from '../const'
import { mainToSub } from '../nodeOperation'
import type { MindElixirInstance, NodeObj } from '../types'
import type { Topic, Wrapper } from '../types/dom'
import { findEle, createExpander } from './dom'

// Judge new added node L or R
export const judgeDirection = function (direction: number, obj: NodeObj) {
  if (direction === LEFT) {
    return LEFT
  } else if (direction === RIGHT) {
    return RIGHT
  } else if (direction === SIDE) {
    const l = document.querySelector('.lhs')?.childElementCount || 0
    const r = document.querySelector('.rhs')?.childElementCount || 0
    if (l <= r) {
      obj.direction = LEFT
      return LEFT
    } else {
      obj.direction = RIGHT
      return RIGHT
    }
  }
}

export const realAddChild = function (mei: MindElixirInstance, to: Topic, wrapper: Wrapper) {
  const tpc = wrapper.children[0].children[0]
  const top = to.parentElement
  if (top.tagName === 'ME-PARENT') {
    mainToSub(tpc)
    if (top.children[1]) {
      top.nextSibling.appendChild(wrapper)
    } else {
      const c = mei.createChildren([wrapper])
      top.appendChild(createExpander(true))
      top.insertAdjacentElement('afterend', c)
    }
    mei.linkDiv(wrapper.offsetParent as Wrapper)
  } else if (top.tagName === 'ME-ROOT') {
    const direction = judgeDirection(mei.direction, tpc.nodeObj)
    if (direction === LEFT) {
      mei.container.querySelector('.lhs')?.appendChild(wrapper)
    } else {
      mei.container.querySelector('.rhs')?.appendChild(wrapper)
    }
    mei.linkDiv()
  }
}

export const addChildDom = function (mei: MindElixirInstance, tpc: Topic, node?: NodeObj) {
  if (!tpc) return null
  const nodeObj = tpc.nodeObj
  if (nodeObj.expanded === false) {
    mei.expandNode(tpc, true)
    tpc = findEle(nodeObj.id) as Topic
  }
  const newNodeObj = node || mei.generateNewObj()

  if (nodeObj.children) nodeObj.children.push(newNodeObj)
  else nodeObj.children = [newNodeObj]
  fillParent(mei.nodeData)

  const { grp, top: newTop } = mei.createWrapper(newNodeObj)
  realAddChild(mei, tpc, grp)
  return { newTop, newNodeObj }
}
export const addChildDomExpand = function (mei: MindElixirInstance, tpc: Topic, node?: NodeObj) {
  if (!tpc) return null
  const nodeObj = tpc.nodeObj
  if (nodeObj.expanded === false) {
    mei.expandNode(tpc, true)
    // dom had resetted
    tpc = findEle(nodeObj.id) as Topic
  }
  const newNodeObj = node || mei.generateNewObj()
  newNodeObj.style = newNodeObj.style || {}
  if (nodeObj.parent === undefined) {
    newNodeObj.style.background = '#fff'
    newNodeObj.style.color = '#000000'
  } else if (nodeObj.parent.parent === undefined) {
    newNodeObj.style.background = getRandomColor()
    newNodeObj.style.color = '#ecf0f1'
  } else {
    newNodeObj.style.background = nodeObj?.style?.background
    newNodeObj.style.color = '#ecf0f1'
  }
  if (nodeObj.children) nodeObj.children.push(newNodeObj)
  else nodeObj.children = [newNodeObj]
  fillParent(mei.nodeData)

  const { grp, top: newTop } = mei.createWrapper(newNodeObj)
  realAddChild(mei, tpc, grp)
  return { newTop, newNodeObj }
}

export const removeNodeDom = function (tpc: Topic, siblingLength: number) {
  const p = tpc.parentNode
  if (siblingLength === 0) {
    // remove epd when children length === 0
    const c = p.parentNode.parentNode
    // root doesn't have epd
    if (c.tagName !== 'ME-MAIN') {
      c.previousSibling.children[1]!.remove()
    }
  }
  p.parentNode.remove()
}
