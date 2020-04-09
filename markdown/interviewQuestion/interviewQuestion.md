# 前端面试宝典


## 前言

>
>本文主要针对自己刷过的题做一个完整的归类笔记，方便查阅，不至于零散的到处找。
>
>



## js

### call, apply, bind的区别，怎么实现call,apply方法?

>在js中，每个函数的原型都指向Function.prototype对象（js基于原型链的继承）。因此，每个函数都会有apply，call，和bind方法，这些方法继承于Function。
>它们的作用是一样的，都是用来改变函数中this的指向。

1. 方法定义：
- apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。
- call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。
2. call 与 apply 的相同点：
- 方法的含义是一样的，即方法功能是一样的；
- 第一个参数的作用是一样的；
3. call 与 apply 的不同点：
- 两者传入的列表形式不一样
- call可以传入多个参数；
- apply只能传入两个参数，所以其第二个参数往往是作为数组形式传入
4. bind的传参方式和call一样，只不过它的不同之处是，apply和call方法调用之后会立即执行，而bind方法调用之后会返回一个新的函数，它并不会立即执行，需要我们手动执行。
5. 存在的意义：
- 实现（多重）继承
   
```javascript

Function.prototype.myBind = function(content) {
    if(typeof this !='function'){
        throw Error('not a function')
    }
    let _this = this;
    let args = [...arguments].slice(1) 
    let resFn=function(){
        return _this.apply(this instanceof resFn?this:content,args.concat(...arguments))
    }
    return resFn
};
 
 /**
 * 每个函数都可以调用call方法，来改变当前这个函数执行的this关键字，并且支持传入参数
 */
Function.prototype.myCall=function(context=window){
      context.fn = this;//此处this是指调用myCall的function
      let args=[...arguments].slice(1);
      let result=content.fn(...args)
      //将this指向销毁
      delete context.fn;
      return result;
}
/**
 * apply函数传入的是this指向和参数数组
 */
Function.prototype.myApply = function(context=window) {
    context.fn = this;
    let result;
    if(arguments[1]){
        result=context.fn(...arguments[1])
    }else{
        result=context.fn()
    }
    //将this指向销毁
    delete context.fn;
    return result;
}


```


## Vue

### 概念

Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

### 特点

- 单页面应用
- 双向数据绑定：视图改变 数据自动更新；数据更新 视图自动改变
- 渐进式：vue vue-router路由 vuex axios
- 框架：自己写的代码被框架调用（库：自己调用库的代码）
- 声明式

### 生命周期

- beforeCreate：即将创建。此阶段为实例初始化之后，此时的数据观察和事件机制都未形成
- created：创建完毕。在这个阶段vue实例已经创建，我们在同样打印一下data和DOM元素。
- beforemount：即将挂载。在上个阶段我们知道DOM还没生成，相关属性还是undefined，那么此阶段为即将挂载。
- mounted:渲染完毕。mounted是平时我们使用最多的函数了，一般我们的异步请求都写在这里。在这个阶段，数据和DOM都已被渲染出来。
- beforeUpdate:即将更新渲染。vue遵循数据驱动DOM的原则，当我们修改vue实例的data时，vue会自动帮我们更新视图。
- updated:更新渲染后。为了不使看到同-函数在不能阶段的效果，我注释掉beforeUpdate函数，添加update函数并绑定了刚才的click事件
- beforeDestroy:销毁之前。到上一步vue已经成功的通过数据驱动DOM更新，当我们不在需要vue操纵DOM时，就需要销毁Vue，也就是清除vue实例与DOM的关联，调用destroy方法可以销毁当前组件。在销毁前，会触发beforeDestroy钩   子函数。
- destroyed:销毁之后。在销毁后，会触发destroyed钩子函数。 

### Vue指令

- v-model ：放在表单元素input、textarea、select>option上的，实现双向数据绑定
- v-text ： 展示对应的文本
- v-once ： 对应的标签只渲染一次
- v-show ： 是否能显示
- v-html : 把值中的标签渲染出来
- v-for : 循环显示元素
- v-bind : 用于绑定行内属性 简写成:
- v-if : 控制是否渲染该元素
- v-cloak : 需要配合css使用：解决小胡子显示问题
- v-pre : 跳过有这个指令的标签及其子元素的编译，按照原生代码编译


### 事件修饰符

> - .self只点元素本身时才触发事件
> - .stop阻止冒泡事件
> - .prevent阻止默认事件
> - .once对应函数只触发一次
> - .capture在捕获阶段触发二级绑定事件
> - .passive优先执行默认事件（滚动行为）

### 表单修饰符

> - .number转化为数字，类似parse转化
> - .trim去字符串前后空格

### directives自定义指令

```javascript

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// 如果想注册局部指令，组件中也接受一个 directives 的选项
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}

//然后你可以在模板中任何元素上使用新的 v-focus 属性，如下：

<input v-focus>

```

> 一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
> - bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
> - inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
> - update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
> - componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
> - unbind：只调用一次，指令与元素解绑时调用。

### vue-router路由传参

> 提供了两种传参方式:
> - query传参（问号传参）
>  路由映射表不用改动 :to={path:'',query:{}}或者:to={name:'',query:{}}
> - params传参（路径传参）
>  在映射表中添加  /:变量  的形式； :to={name:'',params:{变量:''}}}


### 接口请求一般放在哪个生命周期中？

接口请求一般放在mounted中，但需要注意的是服务端渲染时不支持mounted，需要放到created中。

### Computed和Watch区别

- Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。
  适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。
- Watch没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用unWatch手动注销哦。

### v-if和v-show的区别

当条件不成立时，v-if不会渲染DOM元素，v-show操作的是样式(display)，切换当前DOM的显示和隐藏。

### 组件中的data为什么是一个函数？

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

### Vue模版编译原理

简单说，Vue的编译过程就是将template转化为render函数的过程。会经历以下阶段：

- 生成AST树（解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)）
- 优化
- codegen

### keep-alive作用

keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载。
常用的两个属性include/exclude，允许组件有条件的进行缓存。
两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。
keep-alive的中还运用了LRU(Least Recently Used)算法。

### 性能优化

- 编码阶段
>1. 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
>2. v-if和v-for不能连用
>3. 如果需要使用v-for给每项元素绑定事件时使用事件代理
>4. SPA 页面采用keep-alive缓存组件
>5. 在更多的情况下，使用v-if替代v-show
>6. key保证唯一
>7. 使用路由懒加载、异步组件
>8. 防抖、节流
>9. 第三方模块按需导入
>10. 长列表滚动到可视区域动态加载 
>11. 图片懒加载
- SEO优化
>1. 预渲染
>2. 服务端渲染SSR

- 打包优化
>1. 压缩代码
>2. Tree Shaking/Scope Hoisting
>3. 使用cdn加载第三方模块
>4. 多线程打包happypack
>5. splitChunks抽离公共文件
>6. sourceMap优化
- 用户体验
>1. 骨架屏
>2. PWA
>3. 客户端缓存、服务端缓存


### Vuex

- 概念
> Vuex 是一个专为 Vue应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
- 结构
> State ---单一状态
> Getter --- Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
> Mutation --- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
> Action --- Action 提交的是 mutation，而不是直接变更状态， Action 可以包含任意异步操作。
> Module --- Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。


## React

### 概念

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。

### 生命周期

> - 挂载卸载过程
>> - constructor() ---完成了React数据的初始化。需要注意：只要使用了constructor()就必须写super(),否则会导致this指向错误。
>> - componentWillMount() ---一般用的比较少，它更多的是在服务端渲染时使用。它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。
>> - componentDidMount() ---组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染
>> - componentWillUnmount () 在此处完成组件的卸载和数据的销毁（clear你在组建中所有的setTimeout,setInterval；移除所有组建中的监听removeEventListener）。

> - 更新过程
>> - componentWillReceiveProps (nextProps) ---在接受父组件改变后的props需要重新渲染组件时用到的比较多，接受一个参数nextProps，通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件。
>> - shouldComponentUpdate(nextProps,nextState) ---主要用于性能优化(部分更新)，唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新，因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断。
>> - componentWillUpdate (nextProps,nextState) ---当shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate,这里同样可以拿到nextProps和nextState。
>> - componentDidUpdate(prevProps,prevState) ---组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState，即更新前的props和state。
>> - render() ---此render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染。


### React路由传参

```javascript

import queryString from 'query-string'
//方式一
this.props.history.push({
      pathname: '/course/platformCourse',
      search:   queryString.stringify({
         id: '0212',
         name:'你好'   
      })
    })

//方式二
this.props.history.push(`/cart?cartType=${cartType}`)

//获取参数并解析
queryString.parse(this.props.location.search)

```

### 直接输出HTML方法

```javascript

<div  dangerouslySetInnerHTML={{ __html: item.info}}></div>

```


## Vue&React

### 为什么说Vue 的响应式更新比 React 快？

- Vue (响应式+依赖收集)对于响应式属性的更新，只会精确更新依赖收集的当前组件，个组件都有自己的渲染 watcher，而不会递归的去更新子组件。
- React 在类似的场景下是自顶向下的进行递归更新的，也就是说，React 中假如 ChildComponent 里还有十层嵌套子元素，那么所有层次都会递归的重新render（在不进行手动优化的情况下），这是性能上的灾难。（因此，React 创造了Fiber，创造了异步渲染，其实本质上是弥补被自己搞砸了的性能）。他们能用收集依赖的这套体系吗？不能，因为他们遵从Immutable的设计思想，永远不在原对象上修改属性，那么基于 Object.defineProperty 或 Proxy 的响应式依赖收集机制就无从下手了（你永远返回一个新的对象，我哪知道你修改了旧对象的哪部分？）同时，由于没有响应式的收集依赖，React 只能递归的把所有子组件都重新 render一遍（除了memo和shouldComponentUpdate这些优化手段），然后再通过 diff算法 决定要更新哪部分的视图，这个递归的过程叫做 reconciler，听起来很酷，但是性能很灾难。




