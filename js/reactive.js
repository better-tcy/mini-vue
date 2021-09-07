// 依赖收集 派发更新

class Dep {
  constructor() {
    this.subs = new Set()
  }

  addSub(sub) {
    this.subs.add(sub)
  }

  notify() {
    this.subs.forEach((sub) => {
      sub()
    })
  }
}

let effectFun = null
function watchEffect(effect) {
  effectFun = effect
  effect()
}

const subsTree = new WeakMap()
function track(target, property) {
  let dep = subsTree.get(target)
  if (!dep) {
    dep = new Dep()
    subsTree.set(target, dep)
  }
  effectFun && dep.addSub(effectFun)
}


const handler = {
  get(target, property) {
    track(target, property)
    if (Object.prototype.toString.call(target[property]) === '[object Object]') {
      return new Proxy(target[property], handler)
    }
    effectFun = null
    return target[property]
  },
  set(target, property, newValue) {
    target[property] = newValue
    const dep = subsTree.get(target)
    dep.notify()
  }
}

function reactive(target) {
  return new Proxy(target, handler)
}


