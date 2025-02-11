import type { SummarySvgGroup } from './summary'
import type { Expander, CustomSvg } from './types/dom'
import type { MindElixirInstance } from './types/index'
import { isTopic } from './utils'
import { findEle } from './utils/dom'
import dragMoveHelper from './utils/dragMoveHelper'

export default function (mind: MindElixirInstance) {
  mind.map.addEventListener('click', e => {
    if (e.button !== 0) return
    if (mind.helper1?.moved) {
      mind.helper1.clear()
      return
    }
    if (mind.helper2?.moved) {
      mind.helper2.clear()
      return
    }
    if (dragMoveHelper.moved) {
      dragMoveHelper.clear()
      return
    }
    mind.clearSelection()
    const target = e.target as any

    if (target.tagName === 'ME-EPD') {
      mind.expandNode((target as Expander).previousSibling)
    } else if (isTopic(target)) {
      if (mind.draggable) {
        let iconContainer: any = document.getElementById('icon-container')
        console.log('🚀 ~ iconContainer:', iconContainer)
        if (!iconContainer) {
          iconContainer = document.createElement('div')
          iconContainer.id = 'icon-container'
          iconContainer.style.position = 'absolute'
          iconContainer.style.backgroundColor = '#fff'
          iconContainer.style.border = '1px solid #ddd'
          iconContainer.style.padding = '10px'
          iconContainer.style.borderRadius = '12px'
          iconContainer.style.width = '280px'
          iconContainer.style.zIndex = '1000'
          iconContainer.style.display = 'none'
          iconContainer.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'
          iconContainer.style.display = 'grid'

          const icons = [
            { icon: '✝️', action: 'addChild', name: 'Thêm thẻ con' },
            { icon: '➕', action: 'addSibling', name: 'Thêm thẻ ngang hàng' },
            { icon: '🖼️', action: 'addImage', name: 'Thêm ảnh' },
            { icon: '🎥', action: 'addVideo', name: 'Thêm video' },
            { icon: '🔗', action: 'connectNodes', name: 'Nối các node' },
            { icon: '📑', action: 'copy', name: 'Sao chép' },
            { icon: '📜', action: 'paste', name: 'Dán' },
            { icon: '🗑️', action: 'delete', name: 'Xóa' },
            { icon: '💬', action: 'comment', name: 'Thêm bình luận' },
            { icon: '⬆️', action: 'moveUp', name: 'Di chuyển lên' },
            { icon: '⬇️', action: 'moveDown', name: 'Di chuyển xuống' },
            { icon: '⬅️', action: 'moveLeft', name: 'Di chuyển trái' },
            { icon: '➡️', action: 'moveRight', name: 'Di chuyển phải' },
            { icon: '❓', action: 'instruction', name: 'Hướng dẫn sử dụng' },
          ]
          icons.forEach(item => {
            const iconDiv = document.createElement('div')
            const tooltip = document.createElement('span')

            iconDiv.textContent = item.icon
            iconDiv.style.cursor = 'pointer'
            iconDiv.style.fontSize = '18px'
            iconDiv.style.margin = '5px'
            iconDiv.style.position = 'relative'
            iconDiv.style.display = 'inline-block'
            // Tạo tooltip ẩn
            tooltip.textContent = item.name
            tooltip.style.position = 'absolute'
            tooltip.style.top = '-25px'
            tooltip.style.left = '50%'
            tooltip.style.transform = 'translateX(-50%)'
            tooltip.style.backgroundColor = '#333'
            tooltip.style.color = '#fff'
            tooltip.style.padding = '5px'
            tooltip.style.borderRadius = '4px'
            tooltip.style.fontSize = '12px'
            tooltip.style.whiteSpace = 'nowrap'
            tooltip.style.display = 'none'

            iconDiv.addEventListener('mouseover', () => {
              tooltip.style.display = 'block'
            })
            iconDiv.addEventListener('mouseout', () => {
              tooltip.style.display = 'none'
            })

            iconDiv.addEventListener('click', e => {
              e.stopPropagation()
              if (item.action === 'addChild') {
                mind.addChildExpand()
              } else if (item.action === 'addSibling') {
                mind.insertSibling('after')
              } else if (item.action === 'connectNodes') {
                mind.bus.fire('selectConnect', target.nodeObj)
              } else if (item.action === 'moveUp') {
                mind.moveUpNode()
              } else if (item.action === 'moveDown') {
                mind.moveDownNode()
              } else if (item.action === 'copy') {
                if (mind.currentNode) mind.waitCopy = [mind.currentNode]
                else if (mind.currentNodes) mind.waitCopy = mind.currentNodes
                mind.bus.fire('copyExpandTable', target.nodeObj)
              } else if (item.action === 'paste') {
                if (!mind.waitCopy || !mind.currentNode) return
                if (mind.waitCopy.length === 1) {
                  mind.copyNode(mind.waitCopy[0], mind.currentNode)
                }
              } else if (item.action === 'delete') {
                mind.removeNode()
              } else if (item.action === 'instruction') {
                window.open('https://support.ezsale.vn/mindmapcustomer/58c40fe7-1e54-44f8-ae15-68bea5944840')
              } else if (item.action === 'comment') {
                mind.bus.fire('commentNode', target.nodeObj)
              } else if (item.action === 'addImage') {
                mind.bus.fire('addImage', target.nodeObj)
              } else if (item.action === 'addVideo') {
                mind.bus.fire('addVideo', target.nodeObj)
              } else if (item.action === 'moveLeft') {
                mind.bus.fire('moveLeft', target.nodeObj)
              } else if (item.action === 'moveRight') {
                mind.bus.fire('moveRight', target.nodeObj)
              }

              iconContainer.style.display = 'none'
            })

            iconDiv.appendChild(tooltip)
            iconContainer.appendChild(iconDiv)
          })

          document.body.appendChild(iconContainer)
        }

        const rect = target.getBoundingClientRect()
        iconContainer.style.left = `${rect.left + window.scrollX}px`
        console.log('🚀 ~ rect.top:', rect)
        if (rect.top < 90) {
          iconContainer.style.top = `${rect.top + 50}px`
        } else iconContainer.style.top = `${rect.top - 90}px`

        iconContainer.style.display = 'block'
        e.stopPropagation()
        document.addEventListener('click', event => hideIconContainer(event, iconContainer))
        document.addEventListener('keydown', event => hideIconContainer(event, iconContainer))
      }

      mind.selectNode(target, false, e)
    } else if (!mind.editable) {
      return
    } else if (target.tagName === 'text') {
      if (target.dataset.type === 'custom-link') {
        mind.selectArrow(target.parentElement as CustomSvg)
      } else {
        mind.selectSummary(target.parentElement as unknown as SummarySvgGroup)
      }
    } else if (target.className === 'circle') {
    }
  })

  mind.map.addEventListener('dblclick', e => {
    e.preventDefault()
    if (!mind.editable) return
    const target = e.target as HTMLElement
    if (isTopic(target)) {
      mind.beginEdit(target)
    } else if (target.tagName === 'text') {
      if (target.dataset.type === 'custom-link') {
        mind.editArrowLabel(target.parentElement as unknown as CustomSvg)
      } else {
        mind.editSummary(target.parentElement as unknown as SummarySvgGroup)
      }
    }
  })

  /**
   * drag and move the map
   */
  let isSpacePressed = false

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      isSpacePressed = true
    }
  })

  document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
      isSpacePressed = false
    }
  })

  mind.map.addEventListener('mousemove', e => {
    if (((e.target as HTMLElement).contentEditable !== 'true' && isSpacePressed && e.buttons & 1) || e.buttons & 2) {
      dragMoveHelper.onMove(e, mind.container)
    }
  })

  // mind.map.addEventListener('mousemove', e => {
  //   if ((e.target as HTMLElement).contentEditable !== 'true') {
  //     dragMoveHelper.onMove(e, mind.container)
  //   }
  // })

  mind.map.addEventListener('mousedown', e => {
    // Xử lý cả chuột trái (0) và chuột phải (2)
    if (e.button !== 0 && e.button !== 2) return

    if ((e.target as HTMLElement).contentEditable !== 'true') {
      dragMoveHelper.moved = false
      dragMoveHelper.mousedown = true
    }
  })

  mind.map.addEventListener('mouseleave', e => {
    const mouseMoveButton = mind.mouseSelectionButton === 0 ? 2 : 0
    if (e.button !== mouseMoveButton) return
    dragMoveHelper.clear()
  })
  mind.map.addEventListener('mouseup', e => {
    const mouseMoveButton = mind.mouseSelectionButton === 0 ? 2 : 0
    if (e.button !== mouseMoveButton) return
    dragMoveHelper.clear()
  })

  mind.map.addEventListener('contextmenu', e => {
    e.preventDefault()
  })
  let isLeftMousePressed = false

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      isSpacePressed = true
    }
  })

  document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
      isSpacePressed = false
    }
  })

  mind.map.addEventListener('mousedown', e => {
    if (e.button === 0) {
      isLeftMousePressed = true
    }
  })

  mind.map.addEventListener('mouseup', e => {
    if (e.button === 0) {
      isLeftMousePressed = false
    }
    dragMoveHelper.clear()
  })

  mind.map.addEventListener('mousemove', e => {
    if (isSpacePressed && isLeftMousePressed && (e.target as HTMLElement).contentEditable !== 'true') {
      dragMoveHelper.onMove(e, mind.container)
    }
  })

  mind.map.addEventListener('mouseleave', e => {
    isLeftMousePressed = false
    dragMoveHelper.clear()
  })
}
export function hideIconContainer(e: any, iconContainer: HTMLElement) {
  if (!iconContainer.contains(e.target)) {
    iconContainer.style.display = 'none'
    document.removeEventListener('click', event => hideIconContainer(event, iconContainer))
    document.removeEventListener('keydown', event => hideIconContainer(event, iconContainer))
  }
}
