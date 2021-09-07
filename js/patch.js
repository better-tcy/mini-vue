// diff
function patch(newVdom, oldVdom) {
  const el = newVdom.el = oldVdom.el

  // 节点tag不一样 直接删除旧节点 根据新的vdom创建新的节点 并挂载
  if (newVdom.tag !== oldVdom.tag) {
    const parentNode = el.parentNode
    parentNode.removeChild(el)
    mount(newVdom, parentNode)
  }


  // 处理属性
  Object.keys(newVdom.props).forEach((key) => {
    if (oldVdom.props.hasOwnProperty(key)) {
      if (oldVdom.props[key] !== newVdom.props[key]) {

        el.setAttribute(key, newVdom.props[key])
      }
    } else {
      el.setAttribute(key, newVdom.props[key])
    }
  })

  Object.keys(oldVdom.props).forEach((key) => {
    if (!newVdom.props.hasOwnProperty(key)) {
      el.removeAttribute(key)
    }
  })

  // 处理children
  if (typeof newVdom.children === 'string') {
    if (newVdom.children !== oldVdom.children) {
      el.innerHTML = newVdom.children
    }
  }

  if (Array.isArray(newVdom.children) && typeof oldVdom.children === 'string') {
    el.innerHTML = ""
    newVdom.children.forEach((newVNode) => {
      mount(newVNode, el)
    })
  }

  if (Array.isArray(newVdom.children) && Array.isArray(oldVdom.children)) {
    // old [vNode1,vNode2,vNode3,vNode4]
    // new [vNode6,vNode3,vNode1]

    for (let newVNodeI in newVdom.children) {
      // 获取真实dom
      const dom = document.querySelector(`${newVdom.children[newVNodeI].tag}[key='${newVdom.children[newVNodeI].props.key}']`)

      if (dom) {
        // 将真实dom移到对应位置
        el.insertBefore(dom, el.childNodes[newVNodeI]);
        dom.vdom.mark = true
        patch(newVdom.children[newVNodeI], dom.vdom)
        dom.vdom = newVdom.children[newVNodeI]
      } else {
        // 在指定位置 创建真实dom
        el.insertBefore(mount(newVdom.children[newVNodeI]), el.childNodes[newVNodeI]);
      }
    }

    // 删除多余doms
    oldVdom.children.forEach((oldVNode) => {
      if (!oldVNode.mark) {
        el.removeChild(oldVNode.el)
      }
    })
  }
}