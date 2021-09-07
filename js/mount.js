// 把vdom转成真实dom 并挂载

function mount(vdom, parentNode) {
  // 创建真实dom el保存dom指针
  const el = document.createElement(vdom.tag);

  // vdom上保存一份真实dom引用
  vdom.el = el

  // 真实dom上挂载一份vdom引用
  el.vdom = vdom

  // 挂载对应属性
  Object.keys(vdom.props).forEach((key) => {
    el.setAttribute(key, vdom.props[key])
  })

  // 处理children
  if (typeof vdom.children === 'string') {
    el.innerHTML = vdom.children
  } else {
    vdom.children.forEach((vNode) => {
      mount(vNode, el)
    })
  }

  if (parentNode) {
    // 挂载
    parentNode.appendChild(el)
  } else {
    return el
  }
}