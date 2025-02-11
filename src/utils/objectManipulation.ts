import type { NodeObj } from '../types'

const getSibling = (obj: NodeObj): { siblings: NodeObj[]; index: number } => {
  const siblings = obj.parent?.children as NodeObj[]
  const index = siblings.indexOf(obj)
  return { siblings, index }
}

export function moveUpObj(obj: NodeObj): { currentIndex: number; swappedIndex: number; obj: NodeObj; siblings: any; oldSibling: any } {
  const { siblings, index } = getSibling(obj)
  const t = siblings[index]
  let swappedIndex
  const oldSibling = siblings

  if (index === 0) {
    swappedIndex = siblings.length - 1
    siblings[index] = siblings[swappedIndex]
    siblings[swappedIndex] = t
  } else {
    swappedIndex = index - 1
    siblings[index] = siblings[swappedIndex]
    siblings[swappedIndex] = t
  }

  return { currentIndex: index, swappedIndex: swappedIndex, obj, siblings, oldSibling }
}

export function moveDownObj(obj: NodeObj): { currentIndex: number; swappedIndex: number; obj: NodeObj; siblings: any; oldSibling: any } {
  const { siblings, index } = getSibling(obj)
  const oldSibling = siblings
  const t = siblings[index]
  let swappedIndex

  if (index === siblings.length - 1) {
    swappedIndex = 0
    siblings[index] = siblings[swappedIndex]
    siblings[swappedIndex] = t
  } else {
    swappedIndex = index + 1
    siblings[index] = siblings[swappedIndex]
    siblings[swappedIndex] = t
  }

  return { currentIndex: index, swappedIndex: swappedIndex, obj, siblings, oldSibling }
}

export function removeNodeObj(obj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  siblings.splice(index, 1)
  return siblings.length
}

export function insertNodeObj(newObj: NodeObj, type: 'before' | 'after', obj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  if (type === 'before') {
    siblings.splice(index, 0, newObj)
  } else {
    siblings.splice(index + 1, 0, newObj)
  }
}

export function insertParentNodeObj(obj: NodeObj, newObj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  siblings[index] = newObj
  newObj.children = [obj]
}

export function moveNodeObj(type: 'in' | 'before' | 'after', from: NodeObj, to: NodeObj) {
  removeNodeObj(from)
  if (type === 'in') {
    if (to.children) to.children.push(from)
    else to.children = [from]
  } else {
    if (from.direction !== undefined) from.direction = to.direction
    const { siblings, index } = getSibling(to)
    if (type === 'before') {
      siblings.splice(index, 0, from)
    } else {
      siblings.splice(index + 1, 0, from)
    }
  }
}
