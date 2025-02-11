import type { MindElixirInstance } from '../types/index'
import './toolBar.less'

const createButton = (id: string, name: string, tooltip: string) => {
  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'icon-container'

  const button = document.createElement('span')
  button.id = id
  button.innerHTML = `<svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-${name}"></use>
    </svg>`
  button.title = tooltip // Thêm tooltip cho icon

  const buttonText = document.createElement('span')
  buttonText.innerText = tooltip

  buttonContainer.appendChild(button)
  buttonContainer.appendChild(buttonText)

  return buttonContainer
}

function createToolBarRBContainer(mind: MindElixirInstance) {
  const toolBarRBContainer = document.createElement('div')
  toolBarRBContainer.className = 'mind-elixir-toolbar rb'

  const row4 = document.createElement('div')
  row4.className = 'toolbar-row'
  const row1 = document.createElement('div')
  row1.className = 'toolbar-row'
  const row2 = document.createElement('div')
  row2.className = 'toolbar-row'
  const row3 = document.createElement('div')
  row3.className = 'toolbar-row'

  const fc = createButton('fullscreen', 'full', 'Toàn màn hình')
  const gc = createButton('toCenter', 'living', 'Trung tâm')
  const zo = createButton('zoomout', 'move', 'Thu nhỏ(hoặc CRL + scroll xuống)')
  const zi = createButton('zoomin', 'add', 'Phóng to(hoặc CRL + scroll lên)')
  const dichuyen = createButton('dichuyen', '', 'Giữ chuột trái + space để di chuyển')
  const instruction = createButton('instruction', 'question', 'Hướng dẫn sử dụng ?')

  row4.appendChild(instruction)
  row1.appendChild(dichuyen)
  row2.appendChild(zi)
  row3.appendChild(zo)
  // row3.appendChild(gc)
  // row2.appendChild(fc)

  toolBarRBContainer.appendChild(row2)
  toolBarRBContainer.appendChild(row3)
  // toolBarRBContainer.appendChild(row4)
  toolBarRBContainer.appendChild(row1)

  // Thêm nút đóng
  const closeButton = document.createElement('button')
  closeButton.className = 'close-button'
  closeButton.innerHTML = '&times;'
  closeButton.onclick = () => {
    toolBarRBContainer.style.display = 'none'
  }
  toolBarRBContainer.appendChild(closeButton)

  fc.onclick = () => {
    mind.container.requestFullscreen()
  }
  gc.onclick = () => {
    mind.toCenter()
  }
  instruction.onclick = () => {
    window.open('https://support.ezsale.vn/mindmapcustomer/58c40fe7-1e54-44f8-ae15-68bea5944840')
  }
  zo.onclick = () => {
    if (mind.scaleVal < 0.6) return
    mind.scale((mind.scaleVal -= 0.2))
    mind.bus.fire('zoom')
  }
  zi.onclick = () => {
    if (mind.scaleVal > 1.6) return
    mind.scale((mind.scaleVal += 0.2))
    mind.bus.fire('zoom')
  }
  return toolBarRBContainer
}
async function sendPostRequest(url: any, data: any) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json()
    console.log('Success:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}
function createToolBarLTContainer(mind: MindElixirInstance) {
  const toolBarLTContainer = document.createElement('div')
  const l = createButton('tbltl', 'left', '')
  const r = createButton('tbltr', 'right', '')
  const s = createButton('tblts', 'side', '')

  toolBarLTContainer.appendChild(l)
  toolBarLTContainer.appendChild(r)
  toolBarLTContainer.appendChild(s)
  toolBarLTContainer.className = 'mind-elixir-toolbar lt'
  l.onclick = () => {
    console.log(1)
    console.log('🚀 ~ createToolBarLTContainer ~ mind:', mind)
    mind.initLeft()
    sendPostRequest(`https://api.support.ezsale.vn/customers/${mind?.nodeData?.id}`, { layout: 'left' })
  }
  r.onclick = () => {
    mind.initRight()
    sendPostRequest(`https://api.support.ezsale.vn/customers/${mind?.nodeData?.id}`, { layout: 'right' })
  }
  s.onclick = () => {
    mind.initSide()
    sendPostRequest(`https://api.support.ezsale.vn/customers/${mind?.nodeData?.id}`, { layout: 'center' })
  }
  return toolBarLTContainer
}

export default function (mind: MindElixirInstance) {
  mind.container.append(createToolBarRBContainer(mind))
  mind.container.append(createToolBarLTContainer(mind))
}
