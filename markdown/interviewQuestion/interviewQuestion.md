# 前端面试宝典


## 前言

>
>本文主要针对自己刷过的题做一个完整的归类笔记，方便查阅，不至于零散的到处找。
>
>

## css



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
4. 存在的意义：
- 实现（多重）继承
   
```javascript

Function.prototype.myBind = function(content) {
    if(typeof this !=='function'){
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

## http


## Vue


## React


## Vue&React

### 为什么说Vue 的响应式更新比 React 快？

Vue (响应式+依赖收集)对于响应式属性的更新，只会精确更新依赖收集的当前组件，个组件都有自己的渲染 watcher，而不会递归的去更新子组件。
而 React 在类似的场景下是自顶向下的进行递归更新的，也就是说，React 中假如 ChildComponent 里还有十层嵌套子元素，那么所有层次都会递归的重新render（在不进行手动优化的情况下），这是性能上的灾难。（因此，React 创造了Fiber，创造了异步渲染，其实本质上是弥补被自己搞砸了的性能）。他们能用收集依赖的这套体系吗？不能，因为他们遵从Immutable的设计思想，永远不在原对象上修改属性，那么基于 Object.defineProperty 或 Proxy 的响应式依赖收集机制就无从下手了（你永远返回一个新的对象，我哪知道你修改了旧对象的哪部分？）同时，由于没有响应式的收集依赖，React 只能递归的把所有子组件都重新 render一遍（除了memo和shouldComponentUpdate这些优化手段），然后再通过 diff算法 决定要更新哪部分的视图，这个递归的过程叫做 reconciler，听起来很酷，但是性能很灾难。




