/**
 * Watermark effect with dom observer
 * @author 余聪
 */

import { observer } from './observer'
import styleToJs from 'style-to-js'

type Options = {
  document?: Document
}

export function createFixedWatermarkContainerDOM(id?: string, style?: any, document = global.document) {
  if (typeof document === 'undefined') {
    console.error(`document is undefined, skip createFixedWatermarkContainerDOM`)
    return
  }
  const container = document.createElement('div')
  if (id) {
    container.id = id
  }
  Object.assign(container.style, {
    display: 'block',
    position: 'absolute',
    margin: `0`,
    top: `0`,
    right: `0`,
    bottom: `0`,
    left: `0`,
    zIndex: `${Number.MAX_SAFE_INTEGER}`,
    // background-image: url('/api-wm/image/visible');
    // backgroundSize: 350px;
    backgroundRepeat: 'repeat',
    backgroundClip: 'border-box',
    pointerEvents: 'none',
    opacity: '1',
    visibility: 'visible',
    ...style
  })
  document.body.appendChild(container)
  return container
}

function getDomElem(dom, document) {
  if (typeof document === 'undefined') {
    console.error(`document is undefined, skip watermarkObserver`)
    return
  }
  let domElem: HTMLElement = dom as HTMLElement
  if (typeof dom === 'string') {
    domElem = document.querySelector(dom) as HTMLElement
  }

  if (!domElem) {
    throw new Error('dom is empty')
  }
  return domElem
}

export function watermarkObserverStandalone(
  dom: string | HTMLElement,
  watermarkSource: string,
  { document = global.document }: Options = {}
) {
  const domElem = getDomElem(dom, document)
  Object.assign(domElem.style, {
    backgroundImage: `url(${JSON.stringify(watermarkSource)})`
  })

  const clonedNode = domElem.cloneNode(true)
  const parentElement = domElem.parentElement

  let disconnect = observer(domElem, parentElement, (evt) => {
    disconnect()

    // remove
    if (evt.type === 'DOMNodeRemoved') {
      parentElement.appendChild(clonedNode)
      disconnect = watermarkObserverStandalone(clonedNode as HTMLElement, watermarkSource, { document })
    } else {
      domElem.replaceWith(clonedNode)
      disconnect = watermarkObserverStandalone(clonedNode as HTMLElement, watermarkSource, { document })
    }
  })

  return () => {
    disconnect()
  }
}

export default function watermarkObserver(
  dom: string | HTMLElement,
  watermarkSource: string,
  { document = global.document }: Options = {}
) {
  const domElem = getDomElem(dom, document)

  Object.assign(domElem.style, {
    backgroundImage: `url(${JSON.stringify(watermarkSource)})`
  })

  const inlineStyle = domElem.getAttribute('style')
  let oldStyle = styleToJs(inlineStyle)

  return observer(domElem, domElem.parentElement, (evt) => {
    Object.assign(domElem.style, { ...oldStyle })
  })
}
