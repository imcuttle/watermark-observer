// @ts-ignore
export const MutationObserver = global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver

export type Callback = (evt: Event & { mutation?: MutationRecord }) => void

function bindMutationEvent(target: HTMLElement, container: HTMLElement | null, callback: Callback) {
  const eventList = [
    'DOMAttrModified',
    'DOMAttributeNameChanged',
    'DOMCharacterDataModified',
    'DOMElementNameChanged',
    'DOMNodeInserted',
    'DOMNodeInsertedIntoDocument',
    'DOMNodeRemoved',
    'DOMNodeRemovedFromDocument',
    'DOMSubtreeModified'
  ]
  eventList.map((eventName) => target.addEventListener(eventName, callback, true))
  container && container.addEventListener('DOMSubtreeModified', callback, true)

  return {
    containerObserver: {
      disconnect: () => container && container.removeEventListener('DOMSubtreeModified', callback, true)
    },
    targetObserver: {
      disconnect: () => eventList.map((eventName) => target.removeEventListener(eventName, callback, true))
    }
  }
}

export const observer = (target: HTMLElement, container: HTMLElement | null, callback: Callback) => {
  const withDisconnect = (ret: any) => {
    return () => {
      if (ret) {
        ret.containerObserver?.disconnect()
        ret.targetObserver?.disconnect()
      }
    }
  }
  if (!MutationObserver) {
    return withDisconnect(bindMutationEvent(target, container, callback))
  }

  let containerObserver: MutationObserver
  if (container) {
    containerObserver = new MutationObserver((mutationsList: MutationRecord[]) => {
      mutationsList.forEach((mutation) => {
        mutation.removedNodes.forEach((item) => {
          if (item === target) {
            const evt = new Event('DOMNodeRemoved') as any
            evt.mutation = mutation
            callback(evt)
            return
          }
        })
      })
    })
    containerObserver.observe(container, { childList: true, subtree: true })
  }

  const targetObserver: MutationObserver = new MutationObserver(callback)
  targetObserver.observe(target, {
    attributes: true
  })
  return withDisconnect({ containerObserver, targetObserver })
}
