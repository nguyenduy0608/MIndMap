import type { MindElixirInstance, NodeObj } from '../types/index'
import './mobileMenu.less'

export default function (mind: MindElixirInstance, option?: any) {
  return
  const createLi = (id: string, name: string) => {
    const div = document.createElement('div')
    div.id = id
    div.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${name}"></use>
  </svg>`
    return div
  }

  const add_child = createLi('cm-add_child', 'zijiedian')
  const add_sibling = createLi('cm-add_sibling', 'tongjijiedian-')
  const remove_child = createLi('cm-remove_child', 'shanchu2')
  // let focus = createLi('cm-fucus', i18n[locale].focus, '')
  // let unfocus = createLi('cm-unfucus', i18n[locale].cancelFocus, '')
  const up = createLi('cm-up', 'rising')
  const down = createLi('cm-down', 'falling')
  const edit = createLi('cm-edit', 'edit')
  // let link = createLi('cm-down', i18n[locale].link, '')

  const menuUl = document.createElement('ul')
  menuUl.className = 'menu-list'
  // if (!option || option.link) {
  //   menuUl.appendChild(link)
  // }
  if (option && option.extend) {
    for (let i = 0; i < option.extend.length; i++) {
      const item = option.extend[i]
      const dom = createLi(item.name, item.name)
      menuUl.appendChild(dom)
      dom.onclick = e => {
        item.onclick(e)
      }
    }
  }
  const menuContainer = document.createElement('mmenu')
  menuContainer.className = 'mobile-menu'
  menuContainer.appendChild(add_child)
  menuContainer.appendChild(add_sibling)
  menuContainer.appendChild(remove_child)
  // if (!option || option.focus) {
  //   menuContainer.appendChild(focus)
  //   menuContainer.appendChild(unfocus)
  // }
  menuContainer.appendChild(up)
  menuContainer.appendChild(down)
  menuContainer.appendChild(edit)
  menuContainer.hidden = true

  mind.container.append(menuContainer)
  let isRoot = true
  // mind.container.onclick = function (e) {
  //   e.preventDefault()
  //   // console.log(e.pageY, e.screenY, e.clientY)
  //   let target = e.target
  //   if (target.tagName === 'ME-TPC') {
  //     if (target.parentElement.tagName === 'ME-ROOT') {
  //       isRoot = true
  //     } else {
  //       isRoot = false
  //     }
  //     // if (isRoot) {
  //     //   focus.className = 'disabled'
  //     //   up.className = 'disabled'
  //     //   down.className = 'disabled'
  //     //   add_sibling.className = 'disabled'
  //     //   remove_child.className = 'disabled'
  //     // } else {
  //     //   focus.className = ''
  //     //   up.className = ''
  //     //   down.className = ''
  //     //   add_sibling.className = ''
  //     //   remove_child.className = ''
  //     // }
  //     mind.selectNode(target)
  //     menuContainer.hidden = false
  //     let height = menuUl.offsetHeight
  //     let width = menuUl.offsetWidth
  //     let rect = target.getBoundingClientRect()
  //     // menuUl.style.top = rect.top - 10 - height + 'px'
  //     // menuUl.style.left = rect.left - (width - rect.width) / 2 + 'px'
  //     // menuUl.style.left = e.clientX + 'px'
  //   }
  // }

  mind.bus.addListener('unselectNode', function () {
    menuContainer.hidden = true
  })
  mind.bus.addListener('selectNode', function (nodeObj: NodeObj) {
    menuContainer.hidden = false
    if (nodeObj.root) {
      isRoot = true
    } else {
      isRoot = false
    }
  })
  menuContainer.onclick = e => {
    if (e.target === menuContainer) menuContainer.hidden = true
  }

  add_child.onclick = () => {
    mind.addChild()
  }
  add_sibling.onclick = () => {
    if (isRoot) return
    mind.insertSibling('after')
  }
  remove_child.onclick = () => {
    if (isRoot) return
    mind.removeNode()
  }
  // focus.onclick = e => {
  //   if (isRoot) return
  //   mind.focusNode(mind.currentNode)
  //   menuContainer.hidden = true
  // }
  // unfocus.onclick = e => {
  //   mind.cancelFocus()
  //   menuContainer.hidden = true
  // }
  up.onclick = e => {
    if (isRoot) return
    mind.moveUpNode()
  }
  down.onclick = e => {
    if (isRoot) return
    mind.moveDownNode()
  }
  edit.onclick = e => {
    mind.beginEdit()
  }
  // link.onclick = e => {
  //   let from = mind.currentNode
  //   mind.map.addEventListener(
  //     'click',
  //     e => {
  //       e.preventDefault()
  //       if (
  //         e.target.parentElement.tagName === 'ME-PARENT' ||
  //         e.target.parentElement.tagName === 'ME-ROOT'
  //       ) {
  //         mind.drawArrow(from, mind.currentNode)
  //       } else {
  //         console.log('取消连接')
  //       }
  //     },
  //     {
  //       once: true,
  //     }
  //   )
  // }
}
