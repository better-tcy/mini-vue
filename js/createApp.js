function createApp(rootComponent) {
  return {
    mount(selector) {
      const container = document.querySelector(selector)
      let isMounted = false
      let oldVdom = null
      watchEffect(() => {
        if (!isMounted) {
          oldVdom = rootComponent.render()
          mount(oldVdom, container)
          isMounted = true
        } else {
          const newVdom = rootComponent.render()
          patch(newVdom, oldVdom)
          oldVdom = newVdom
        }
      })
    }
  }
}