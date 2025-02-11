import type { Arrow } from '../arrow'
import type { Summary } from '../summary'
import type { NodeObj } from '../types/index'

type NodeOperation =
  | {
      name:
        | 'undoNode'
        | 'moveNodeIn'
        | 'moveDownNode'
        | 'moveUpNode'
        | 'copyNode'
        | 'addChild'
        | 'addChildExpand'
        | 'insertParent'
        | 'insertBefore'
        | 'beginEdit'
        | 'selectConnect'
        | 'commentNode'
        | 'addImage'
        | 'addVdieo'
        | 'copyExpandTable'
      obj: NodeObj
      result?: any
      nodeEle?: any
    }
  | {
      name: 'insertSibling'
      type: 'before' | 'after'
      obj: NodeObj
      nodeObj?: NodeObj
    }
  | {
      name: 'reshapeNode'
      obj: NodeObj
      origin: NodeObj
    }
  | {
      name: 'finishEdit'
      obj: NodeObj
      origin: string
    }
  | {
      name: 'moveNodeAfter' | 'moveNodeBefore' | 'moveNodeIn'
      objs: NodeObj[]
      toObj: NodeObj
    }
  | {
      name: 'removeNode'
      obj: NodeObj
      originIndex?: number
      originParentId?: string
    }

type MultipleNodeOperation =
  | {
      name: 'removeNodes'
      objs: NodeObj[]
    }
  | {
      name: 'copyNodes'
      objs: NodeObj[]
    }

export type SummaryOperation =
  | {
      name: 'createSummary'
      obj: Summary
    }
  | {
      name: 'removeSummary'
      obj: { id: string }
    }
  | {
      name: 'finishEditSummary'
      obj: Summary
    }

export type ArrowOperation =
  | {
      name: 'createArrow'
      obj: Arrow
    }
  | {
      name: 'removeArrow'
      obj: { id: string }
    }
  | {
      name: 'finishEditArrowLabel'
      obj: Arrow
    }
  | {
      name: 'selectArrow'
      obj: any
    }
  | {
      name: 'editLink'
      obj: any
    }

export type Operation = NodeOperation | MultipleNodeOperation | SummaryOperation | ArrowOperation
export type OperationType = Operation['name']

export type EventMap = {
  operation: (info: Operation) => void
  selectNode: (nodeObj: NodeObj, e?: MouseEvent) => void
  selectNewNode: (nodeObj: NodeObj) => void
  selectNodes: (nodeObj: NodeObj[]) => void
  unselectNode: () => void
  unselectNodes: () => void
  selectConnect: (NodeObj: NodeObj) => void
  expandNode: (nodeObj: NodeObj) => void
  commentNode: (nodeObj: NodeObj) => void
  addImage: (nodeObj: NodeObj) => void
  addVideo: (nodeObj: NodeObj) => void
  moveLeft: (NodeObj: NodeObj) => void
  moveRight: (NodeObj: NodeObj) => void
  copyExpandTable: (nodeObj: NodeObj) => void
  zoom: () => void
}

const Bus = {
  create<T extends Record<string, (...args: any[]) => void> = EventMap>() {
    return {
      handlers: {} as Record<keyof T, ((...arg: any[]) => void)[]>,
      showHandler: function () {
        console.log(this.handlers)
      },
      addListener: function <K extends keyof T>(type: K, handler: T[K]) {
        if (this.handlers[type] === undefined) this.handlers[type] = []
        this.handlers[type].push(handler)
      },
      fire: function <K extends keyof T>(type: K, ...payload: Parameters<T[K]>) {
        if (this.handlers[type] instanceof Array) {
          const handlers = this.handlers[type]
          for (let i = 0; i < handlers.length; i++) {
            handlers[i](...payload)
          }
        }
      },
      removeListener: function <K extends keyof T>(type: K, handler: T[K]) {
        if (!this.handlers[type]) return
        const handlers = this.handlers[type]
        if (!handler) {
          handlers.length = 0
        } else if (handlers.length) {
          for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
              this.handlers[type].splice(i, 1)
            }
          }
        }
      },
    }
  },
}

export default Bus
