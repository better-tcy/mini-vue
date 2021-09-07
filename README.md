### demo背景:
#### 本人是一直都很熟悉vue,也了解过其核心思想,但是没有把全部核心穿插起来整体摸索过,所以就借鉴vue3源码以及加上自己的一些想法 利用碎片时间以及周六日写出了这个mini-vue的demo来加深个人对vue的理解。

### demo集成:
#### createApp函数:创建应用实例(使用watchEffect自动对render函数中的数据进行依赖收集)
#### render函数:将写的h函数转化成虚拟dom
#### mount函数:将虚拟dom转换成真实dom并挂载
#### patch函数:对新旧vdom的diff算法(个人对vdom中带有key的vnode对应的真实dom 采用的是位移操作,尽可能节约性能,注:vue3源码中不是这样实现)
#### reactive函数:依赖收集,派发更新,采用的是Proxy来进行数据的劫持 整体依赖树 采用的是WeakMap数据结构,具体的依赖是收集到Set中的

### 个人有想法以后把 template -> 语法分析,词法分析 -> AST 这一功能集成进来 
