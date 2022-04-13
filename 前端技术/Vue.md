# Vue

# Vue 生命周期

- beforeCreate
- created
- beforeMount
- mounted `dom加载完毕，可以进行ajax请求和dom操作`
- beforeUpdate
- updated
- beforeDestroy
- destroyed

# 组件通信方式

- props / $emit 适用 父子组件通信
- parent / children 适用 父子组件通信
- 事件总线 EventBus
- vuex 状态管理库

# 什么是 mvvm

- Model-View-ViewModel 的缩写
- mvvm 是一种设计思想
- Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑
- View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来
- ViewModel 是一个同步 View 和 Model 的对象
- 在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互

# 双向绑定原理

- vue2 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
- Vue2 中使用 Object.definePorperty() 的缺陷
  - Object.definePorperty()递归遍历所有对象的所有属性，当数据层级较深时，会造成性能影响。
  - Object.definePorperty()只能作用在对象上，不能作用在数组上。
  - Object.definePorperty()只能监听定义时的属性，不能监听新增属性。
  - 由于 Object.definePorperty()不能作用于数组，vue2.0 选择通过重写数组方法原型的方式对数组数据进行监听，但是仍然无法监听数组索引的变化和长度的变更
- Vue3.x 改用 Proxy 替代 Object.defineProperty，因为 Proxy 可以直接监听对象和数组的变化，数组变化也能监听到，不需要深度遍历监听，并且作为新标准将受到浏览器厂商重点持续的性能优化
- Proxy 只会代理对象的第一层，那么 Vue3 又是怎样处理这个问题的呢？
  - 判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测
- 监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？
  - 我们可以判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 trigger。

# 说一下 vue2.x 中如何监测数组变化

使用了函数劫持的方式，重写了数组的方法，Vue 将 data 中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组 api 时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

# data 和 computed 的区别

- data 中的属性并不会随赋值变量的改动而改动，而 computed 会

# 为什么 vue 中 data 必须是一个函数

- js 中，对象为引用类型
- 由于数据对象都指向同一个 data 对象，当在一个组件中修改 data 时，其他重用的组件中的 data 会同时被修改
- 使用返回对象的函数，每次都创建一个新对象，引用地址不同，则不会出现这个问题

# nextTick

定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。 理解：nextTick()，是将回调函数延迟在下一次 dom 更新数据后调用，简单的理解是：当数据更新了，在 dom 中渲染后，自动执行该函数。

- 什么时候用：
  - Vue 生命周期的 created()钩子函数进行的 DOM 操作一定要放在 Vue.nextTick()的回调函数中
  - 当项目中你想在改变 DOM 元素的数据后基于新的 dom 做点什么，对新 DOM 一系列的 js 操作都需要放进 Vue.nextTick()的回调函数中
  - 在使用某个第三方插件时 ，希望在 vue 生成的某些 dom 动态发生变化时重新应用该插件，也会用到该方法，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法，比如 swipebox 插件

# v-if 和 v-show 的区别

- v-if 是动态的向 DOM 树内添加或者删除 DOM 元素
- v-show 是通过设置 DOM 元素的 display 样式属性控制显隐

# Vue 事件绑定原理

原生事件绑定是通过 addEventListener 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的$on 实现的。

# Vue 模版编译原理

简单说，Vue 的编译过程就是将 template 转化为 render 函数的过程。会经历以下阶段：

- 生成 AST 树
- 优化
- codegen

首先解析模版，生成 AST 语法树(一种用 JavaScript 对象的形式来描述整个模板)。 使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。

Vue 的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的 DOM 也不会变化。那么优化过程就是深度遍历 AST 树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。 编译的最后一步是将优化后的 AST 树转换为可执行的代码。

# keep-alive

- keep-alive 可以实现组件缓存，当组件切换时不会对当前组件进行卸载。
- 常用的两个属性 include/exclude，允许组件有条件的进行缓存。
- 两个生命周期 activated/deactivated，用来得知当前组件是否处于活跃状态。

# Vue 的性能优化

- 编码阶段
  - 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
  - v-if 和 v-for 不能连用
  - 如果需要使用 v-for 给每项元素绑定事件时使用事件代理
  - SPA 页面采用 keep-alive 缓存组件
  - 在更多的情况下，使用 v-if 替代 v-show
  - key 保证唯一
  - 使用路由懒加载、异步组件
  - 防抖、节流
  - 第三方模块按需导入
  - 长列表滚动到可视区域动态加载
  - 图片懒加载
- SEO 优化
  - 服务端渲染 SSR
- 打包优化
  - 压缩代码
  - 使用 cdn 加载第三方模块
  - 抽离公共文件
- 用户体验
  - 骨架屏
  - 缓存优化（客户端缓存、服务端缓存、服务端开启 gzip 压缩等）

# vue3 新特性

- 基于 Proxy 的观察者机制，目前，Vue 的反应系统是使用 Object.defineProperty 的 getter 和 setter。 但是，Vue 3 将使用 ES2015 Proxy 作为其观察者机制。 这消除了以前存在的警告，使速度加倍，并节省了一半的内存开销
- 更好的支持 TS 和 JSX

# vuex

## 核心属性

- state 全局唯一数据源
- getters 类似过滤器和计算属性，从 store 中的 state 中派生出一些状态
- mutations 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，类似 redux 里的 reducer，同步任务
- actions 类似 redux 里的异步 reducer，可以执行异步任务
- modules 模块，使用单一状态树，应用的所有状态会集中到一个比较大的对象，变得复杂、臃肿。Vuex 允许我们将 store 分割成模块（module）

## Vuex 中状态储存在哪里，怎么改变它？

- 存储在 state 中，改变 Vuex 中的状态的唯一途径就是显式地提交 (commit) mutation。

## Vuex 中状态是对象时，使用时要注意什么？

- 因为对象是引用类型，复制后改变属性还是会影响原始数据，这样会改变 state 里面的状态，是不允许，所以先用深度克隆复制对象，再修改。
