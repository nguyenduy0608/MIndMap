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
        name: 'Node edittttt',
        onclick: () => {
          alert('extend menu')
        },
      },
      {
        name: 'Thêm vấn đề/bài toán',
        onclick: () => {},
      },
      {
        name: 'tải ảnh',
        onclick: () => {
          window.downloadPng()
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

const data = MindElixir.new('new  1')
mind.init(example)

const m2 = new MindElixir({
  el: '#map2',
  allowUndo: true,
})
m2.init(data)

function sleep() {
  return new Promise<void>(res => {
    setTimeout(() => res(), 1000)
  })
}

mind.bus.addListener('operation', (operation: Operation) => {
  console.log(operation)
  // return {
  //   name: action name,
  //   obj: target object
  // }

  // name: [insertSibling|addChild|removeNode|beginEdit|finishEdit]
  // obj: target

  // name: moveNodeIn
  // obj: {from:target1,to:target2}
})
mind.bus.addListener('selectNode', node => {
  // console.log(node)
})
mind.bus.addListener('expandNode', node => {
  // console.log('expandNode: ', node)
})

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
