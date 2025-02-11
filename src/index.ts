import './index.less'
import './iconfont/iconfont.js'
import { LEFT, RIGHT, SIDE, GAP, DARK_THEME, THEME } from './const'
import { generateUUID, getRandomColor } from './utils/index'
import initMouseEvent from './mouse'
import Bus from './utils/pubsub'
import { findEle } from './utils/dom'
import { createLinkSvg, createLine } from './utils/svg'
// types
export * from './types/index'
export * from './types/dom'
import type { MindElixirData, MindElixirInstance, MindElixirMethods, Options } from './types/index'
import methods from './methods'
import { sub, main } from './utils/generateBranch'

// TODO show up animation
const $d = document

function MindElixir(
  this: MindElixirInstance,
  {
    el,
    direction,
    locale,
    draggable,
    editable,
    contextMenu,
    expandMenu,
    contextMenuOption,
    toolBar,
    keypress,
    hideExpandMenu,
    mouseSelectionButton,
    before,
    newTopicName,
    allowUndo,
    generateMainBranch,
    generateSubBranch,
    overflowHidden,
    mobileMenu,
    theme,
  }: Options
): void {
  let ele: HTMLElement | null = null
  const elType = Object.prototype.toString.call(el)
  if (elType === '[object HTMLDivElement]') {
    ele = el as HTMLElement
  } else if (elType === '[object String]') {
    ele = document.querySelector(el as string) as HTMLElement
  }
  if (!ele) throw new Error('MindElixir: el is not a valid element')

  ele.className += ' mind-elixir'
  ele.innerHTML = ''
  ele.style.setProperty('--gap', GAP + 'px')
  this.mindElixirBox = ele as HTMLElement
  this.before = before || {}
  this.locale = locale || 'en'
  this.contextMenuOption = contextMenuOption
  this.contextMenu = contextMenu === undefined ? true : contextMenu
  this.expandMenu = contextMenu === undefined ? true : contextMenu
  this.hideExpandMenu = hideExpandMenu === undefined ? true : hideExpandMenu
  this.toolBar = toolBar === undefined ? true : toolBar
  this.keypress = keypress === undefined ? true : keypress
  this.mouseSelectionButton = mouseSelectionButton || 0
  this.mobileMenu = mobileMenu || false
  // record the direction before enter focus mode, must true in focus mode, reset to null after exit focus
  this.direction = typeof direction === 'number' ? direction : 1
  this.draggable = draggable === undefined ? true : draggable
  this.newTopicName = newTopicName || 'Vấn đề/bài toán'
  this.editable = editable === undefined ? true : editable
  this.allowUndo = allowUndo === undefined ? false : allowUndo
  // this.parentMap = {} // deal with large amount of nodes
  this.currentNode = null // the selected <tpc/> element
  this.currentArrow = null // the selected link svg element
  this.scaleVal = 1
  this.tempDirection = null
  this.generateMainBranch = generateMainBranch || main
  this.generateSubBranch = generateSubBranch || sub
  this.overflowHidden = overflowHidden || false

  this.bus = Bus.create()

  this.container = $d.createElement('div')
  this.container.className = 'map-container'

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  this.theme = theme || (mediaQuery.matches ? DARK_THEME : THEME)

  // infrastructure
  const canvas = $d.createElement('div') // map-canvas Element
  canvas.className = 'map-canvas'
  this.map = canvas
  this.map.setAttribute('tabindex', '0')
  this.container.appendChild(this.map)
  this.mindElixirBox.appendChild(this.container)

  this.nodes = $d.createElement('me-nodes')
  this.nodes.className = 'main-node-container'

  this.lines = createLinkSvg('lines') // main link container
  this.summarySvg = createLinkSvg('summary') // summary container

  this.linkController = createLinkSvg('linkcontroller')
  this.P2 = $d.createElement('div')
  this.P3 = $d.createElement('div')
  this.P2.className = this.P3.className = 'circle'
  this.P2.style.display = this.P3.style.display = 'none'
  this.line1 = createLine()
  this.line2 = createLine()
  this.linkController.appendChild(this.line1)
  this.linkController.appendChild(this.line2)
  this.linkSvgGroup = createLinkSvg('topiclinks') // storage user custom link svg

  this.map.appendChild(this.nodes)

  if (this.overflowHidden) {
    this.container.style.overflow = 'hidden'
  } else initMouseEvent(this)
}

MindElixir.prototype = methods

MindElixir.LEFT = LEFT
MindElixir.RIGHT = RIGHT
MindElixir.SIDE = SIDE

MindElixir.THEME = THEME
MindElixir.DARK_THEME = DARK_THEME

/**
 * @memberof MindElixir
 * @static
 */
MindElixir.version = '4.0.5'
/**
 * @function
 * @memberof MindElixir
 * @static
 * @name E
 * @param {string} id Node id.
 * @return {TargetElement} Target element.
 * @example
 * E('bd4313fbac40284b')
 */
MindElixir.E = findEle
const color = getRandomColor()
/**
 * @function new
 * @memberof MindElixir
 * @static
 * @param {String} topic root topic
 */
if (import.meta.env.MODE !== 'lite') {
  MindElixir.new = (topic: string): MindElixirData => ({
    nodeData: {
      id: generateUUID(),
      topic: topic || 'new topic',
      root: true,
      style: { background: color, color: '#ecf0f1' },
      children: [],
    },
  })
}

export interface MindElixirCtor {
  new (options: Options): MindElixirInstance
  E: typeof findEle
  new: typeof MindElixir.new
  version: string
  LEFT: typeof LEFT
  RIGHT: typeof RIGHT
  SIDE: typeof SIDE
  THEME: typeof THEME
  DARK_THEME: typeof DARK_THEME
  prototype: MindElixirMethods
}

export default MindElixir as unknown as MindElixirCtor
