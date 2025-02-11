import type { MindElixirCtor } from './index'
import MindElixir from './index'
import example from './exampleData/1'
import example2 from './exampleData/2'
import example3 from './exampleData/3'
import type { Options, MindElixirData, MindElixirInstance } from './types/index'
import type { Operation } from './utils/pubsub'
import style from '../index.css?raw'
import katex from '../katex.css?raw'
import { addChild } from './nodeOperation'

interface Window {
  m: MindElixirInstance
  M: MindElixirCtor
  E: typeof MindElixir.E
  downloadPng: ReturnType<typeof download>
  downloadSvg: ReturnType<typeof download>
}

declare let window: Window

const E = MindElixir.E
const options: Options = {
  el: '#map',
  newTopicName: 'Vấn đề/bài toán',
  direction: MindElixir.SIDE,
  // direction: MindElixir.RIGHT,
  locale: 'en',
  draggable: true,
  editable: true,
  contextMenu: true,
  contextMenuOption: {
    focus: true,
    link: true,
    extend: [
      {
        name: 'thêm nhánh',
        onclick: () => {
          mind.addChild()
        },
      },
      {
        name: 'Xoas noois',
        onclick: () => {
          mind.removeArrow()
        },
      },
      {
        name: 'Thêm nhánh',
        onclick: () => {
          mind.createArrow(
            {
              nodeObj: {
                id: 'bd1b9b94a9a7a913', // ID của nodeư
              },
            },
            {
              nodeObj: {
                id: 'bd1beff607711025',
                topic: 'Node B', // Bổ sung thêm thuộc tính 'topic'
              },

              // Các thuộc tính khác nếu có thể thiết lập được...
            },
            'me-root'
          )
        },
      },

      {
        name: 'tải ảnh',
        onclick: () => {
          window.downloadSvg()
        },
      },
    ],
  },

  mobileMenu: true,
  toolBar: true,
  nodeMenu: true,
  keypress: true,
  allowUndo: true,
  before: {
    insertSibling(el, obj) {
      console.log('insertSibling', el, obj)
      return true
    },
    async addChild(el, obj) {
      console.log('addChild', el, obj)
      // await sleep()
      return true
    },
  },
}

const mind = new MindElixir(options)

mind.init(example)

const data = MindElixir.new('new  1')
const m2 = new MindElixir({
  el: '#map2',
  allowUndo: true,
  direction: 2,
  newTopicName: 'Vấn đề/bài toán',
  // direction: MindElixir.RIGHT,
  locale: 'en',
  draggable: true,
  editable: true,
  contextMenu: true,
  contextMenuOption: {
    focus: true,
    link: true,
    extend: [
      {
        name: 'Node edittttt',
        onclick: () => {
          alert('extend menu')
        },
      },
      {
        name: 'Xoas noois',
        onclick: () => {
          mind.removeArrow()
        },
      },
      {
        name: 'thêm nhánh',
        onclick: () => {
          mind.addChild()
        },
      },
    ],
  },

  mobileMenu: true,
  toolBar: true,
  nodeMenu: true,
  keypress: true,
  before: {
    insertSibling(el, obj) {
      console.log('insertSibling', el, obj)
      return true
    },
    async addChild(el, obj) {
      console.log('addChild', el, obj)
      return true
    },
  },
})
m2.init(data)

mind.bus.addListener('operation', (operation: Operation) => {
  console.log(operation)
})
mind.bus.addListener('selectNode', node => {
  console.log(node)
})
mind.bus.addListener('selectConnect', node => {
  console.log(node)
})
mind.bus.addListener('expandNode', node => {})

const download = (type: 'svg' | 'png') => {
  return async () => {
    try {
      let blob = null
      if (type === 'png') blob = await mind.exportPng(false, style + katex)
      else blob = await mind.exportSvg(false, style + katex)
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'filename.' + type
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    }
  }
}

window.downloadPng = download('png')
window.downloadSvg = download('svg')
window.m = mind
// window.m2 = mind2
window.M = MindElixir
window.E = MindElixir.E
