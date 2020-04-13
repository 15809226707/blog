# 前端知识汇总


## 前言

>
>本篇主要是为了方便自己查阅学习，将前端常涉及的知识做一个完整的归类总结。
>
>



## 第一部分. js

### 1. js数据类型

- 基本数据类型：Boolean、Number、String、undefined、Null、Symbol (ES6新增，表示独一无二的值)
- 引用数据类型：Object、Array、Function

### 2. 数据类型判断

- typeof ：typeof返回一个表示数据类型的字符串，返回结果包括：Number、Boolean、String、Symbol、Object、undefined、Function等7种数据类型，但不能判断Null、Array等
- instanceof ：instanceof 是用来判断A是否为B的实例，表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false。instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性，但它不能检测Null和          undefined
- constructor ：constructor作用和instanceof非常相似。但constructor检测 Object与instanceof不一样，还可以处理基本数据类型的检测。不过函数的 constructor 是不稳定的，这个主要体现在把类的原型进行重写，在重写的过程中很有可能出现把之前    的constructor给覆盖了，这样检测出来的结果就是不准确的。
- Object.prototype.toString.call() ：是最准确最常用的方式。

```javascript

Object.prototype.toString.call();               // [object String]
Object.prototype.toString.call(1);              // [object Number]
Object.prototype.toString.call(true);           // [object Boolean]
Object.prototype.toString.call(undefined);      // [object Undefined]
Object.prototype.toString.call(null);           // [object Null]
Object.prototype.toString.call(new Function()); // [object Function]
Object.prototype.toString.call(new Date());     // [object Date]
Object.prototype.toString.call([]);             // [object Array]
Object.prototype.toString.call(new RegExp());   // [object RegExp]
Object.prototype.toString.call(new Error());    // [object Error]

```

### 3. call, apply, bind的区别，怎么实现call,apply方法?

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

### 4. this指向问题

>由于 JS 的设计原理: 在函数中，可以引用运行环境中的变量。因此就需要一个机制来让我们可以在函数体内部获取当前的运行环境，这便是this。因此要明白 this 指向，其实就是要搞清楚 函数的运行环境，说人话就是，谁调用了函数。
> this的值是在执行的时候才能确认，定义的时候不能确认。 因为this是执行上下文环境的一部分，而执行上下文需要在代码执行之前确定，而不是定义的时候。

- 对于直接调用 foo 来说，不管 foo 函数被放在了什么地方，this 一定是 window
- 对于 obj.foo() 来说，我们只需要记住，谁调用了函数，谁就是 this，所以在这个场景下 foo 函数中的 this 就是 obj 对象
- 在构造函数模式中，类中(函数体中)出现的this.xxx=xxx中的this是当前类的一个实例
- call、apply和bind：this 是第一个参数
- 箭头函数this指向:箭头函数没有自己的this，看其外层的是否有函数，如果有，外层函数的this就是内部箭头函数的this，如果没有，则this是window。


### 5. 原型 / 构造函数 / 实例

- 原型(prototype): 一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹。在 Firefox 和 Chrome 中，每个JavaScript对象中都包含一个__proto__ (非标准)的属性指向它爹(该对象的原型)，可obj.__proto__进行访问。


- 构造函数: 可以通过new来 新建一个对象 的函数。


- 实例: 通过构造函数和new创建出来的对象，便是实例。 实例通过__proto__指向原型，通过constructor指向构造函数。


### 6. 原型链

> 概念：原型链是由原型对象组成，每个对象都有 __proto__ 属性，指向了创建该对象的构造函数的原型，__proto__ 将对象连接起来组成了原型链。是一个用来实现继承和共享属性的有限的对象链。

- 属性查找机制: 当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象Object.prototype，如还是没找到，则输出undefined；

- 属性修改机制: 只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用: b.prototype.x = 2；但是这样会造成所有继承于该对象的实例的属性发生改变。


### 7. 继承（原型链继承）

> 概念：在 JS 中，继承通常指的便是 原型链继承，也就是通过指定原型，并可以通过原型链继承原型上的属性或者方法。原型链是实现继承最原始的模式，即通过prototype属性实现继承。将父类的实例作为子类的原型。常用的有6种继承方式：  

- 原型链继承
- 借用构造函数继承
- 组合继承（组合原型链继承和借用构造函数继承）（常用）
- 原型式继承
- 寄生式继承
- 寄生组合式继承（常用）

### 8. 执行上下文(EC)和执行栈

- 执行上下文: 就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行。执行上下文的生命周期包括三个阶段：创建阶段→执行阶段→回收阶段
- 执行栈: JavaScript 引擎创建了执行栈来管理执行上下文。可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。

### 9. 作用域与作用域链

- 作用域: 执行上下文中还包含作用域链。作用域其实可理解为该上下文中声明的变量和声明的作用范围。可分为 块级作用域 和 函数作用域( 也可理解为：作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作   用域下同名变量不会有冲突。)
- 作用域链：作用域链可以理解为一组对象列表，包含 父级和自身的变量对象，因此我们便能通过作用域链访问到父级里声明的变量或者函数。我们知道，我们可以在执行上下文中访问到父级甚至全局的变量，这便是作用域链的功劳。

### 10. 闭包

> 概念：定义在函数内部的函数。里面的函数可以访问外面函数的变量，外面的变量的是这个内部函数的一部分。（其他说法：闭包属于一种特殊的作用域，称为 静态作用域。它的定义可以理解为: 父函数被销毁 的情况下，返回出的子函数的[[scope]]中仍然保留着> 父级的单变量对象和作用域链，因此可以继续访问到父级的变量对象，这样的函数称为闭包。）

- 作用：1.使用闭包可以访问函数中的变量。2.可以使变量长期保存在内存中，生命周期比较长。
- 缺点：闭包不能滥用，否则会导致内存泄露，影响网页的性能。
- 应用场景：1.函数作为参数传递。2.函数作为返回值

### 11. 浅拷贝与深拷贝

- 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。
- 深拷贝就是在拷贝数据的时候，将数据的所有引用结构都拷贝一份。简单的说就是，在内存中存在两个数据结构完全相同又相互独立的数据，将引用型类型进行复制，而不是只复制其引用关系。

[具体实现方式参考,请点击此处](https://blog.csdn.net/weixin_38008863/article/details/87902901)

### 12. require与import的区别

- require 支持动态导入，属于同步导入，是值拷贝，导出值变化不会影响导入值。
- import  不支持动态导入，正在提案 (babel 下可支持), 属于 异步 导入, 指向内存地址，导入值会随导出值而变化。

### 13. 防抖与节流

> 防抖与节流函数是一种最常用的 高频触发优化方式，能对性能有较大的帮助。

- 防抖 (debounce): 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。

```javascript

function debounce(fn, wait, immediate) {
    let timer = null

    return function() {
        let args = arguments
        let context = this

        if (immediate && !timer) {
            fn.apply(context, args)
        }

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}

```

- 节流(throttle): 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。

```javascript

function throttle(fn, wait, immediate) {
    let timer = null
    let callNow = immediate
    
    return function() {
        let context = this,
            args = arguments

        if (callNow) {
            fn.apply(context, args)
            callNow = false
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args)
                timer = null
            }, wait)
        }
    }
}

```

### 14. AST

> 抽象语法树 (Abstract Syntax Tree)，是将代码逐字母解析成 树状对象 的形式。这是语言之间的转换、代码语法检查，代码风格检查，代码格式化，代码高亮，代码错误提示，代码自动补全等等的基础。

### 15. babel编译原理

- babylon 将 ES6/ES7 代码解析成 AST
- babel-traverse 对 AST 进行遍历转译，得到新的 AST
- 新 AST 通过 babel-generator 转换成 ES5

### 16. 函数柯里化

> 在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为函数的柯里化。通常可用于在不侵入函数的前提下，为函数 预置通用参数，供多次重复调用。

```javascript

const add = function add(x) {
	return function (y) {
		return x + y
	}
}

const add1 = add(1)

add1(2) === 3
add1(20) === 21

```

### 17. Array 常见操作方法

- map: 遍历数组，返回回调返回值组成的新数组

- forEach: 无法break，可以用try/catch中throw new Error来停止

- filter: 过滤

- some: 有一项返回true，则整体为true

- every: 有一项返回false，则整体为false

- join: 通过指定连接符生成字符串

- push / pop: 末尾推入和弹出，改变原数组， 返回推入/弹出项

- unshift / shift: 头部推入和弹出，改变原数组，返回操作项

- sort(fn) / reverse: 排序与反转，改变原数组

- concat: 连接数组，不影响原数组， 浅拷贝

- slice(start, end): 返回截断后的新数组，不改变原数组

- splice(start, number, value...): 返回删除元素组成的数组，value 为插入项，改变原数组

- indexOf / lastIndexOf(value, fromIndex): 查找数组项，返回对应的下标

- reduce / reduceRight(fn(prev, cur)， defaultPrev): 两两执行，prev 为上次化简函数的return值，cur 为当前值(从第二项开始)

- flat： 数组拆解， flat: [1,[2,3]] --> [1, 2, 3]

### 18. Object 常见操作方法

- Object.keys(obj): 获取对象的可遍历属性(键)

- Object.values(obj): 获取对象的可遍历属性值(值)

- Object.entries(obj): 获取对象的可遍历键值对

- Object.assign(targetObject,...object): 合并对象可遍历属性

- Object.is(value1,value2): 判断两个值是否是相同的值

详细参考，请点击 [js对象方法大全](https://blog.csdn.net/qq_26562641/article/details/88575516?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1)



## 第二部分. Vue

### 1. 概念

Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

### 2. 特点

- 单页面应用
- 双向数据绑定：视图改变 数据自动更新；数据更新 视图自动改变
- 渐进式：vue vue-router路由 vuex axios
- 框架：自己写的代码被框架调用（库：自己调用库的代码）
- 声明式

### 3. 生命周期

- beforeCreate：即将创建。此阶段为实例初始化之后，此时的数据观察和事件机制都未形成
- created：创建完毕。在这个阶段vue实例已经创建，我们在同样打印一下data和DOM元素。
- beforemount：即将挂载。在上个阶段我们知道DOM还没生成，相关属性还是undefined，那么此阶段为即将挂载。
- mounted:渲染完毕。mounted是平时我们使用最多的函数了，一般我们的异步请求都写在这里。在这个阶段，数据和DOM都已被渲染出来。
- beforeUpdate:即将更新渲染。vue遵循数据驱动DOM的原则，当我们修改vue实例的data时，vue会自动帮我们更新视图。
- updated:更新渲染后。为了不使看到同-函数在不能阶段的效果，我注释掉beforeUpdate函数，添加update函数并绑定了刚才的click事件
- beforeDestroy:销毁之前。到上一步vue已经成功的通过数据驱动DOM更新，当我们不在需要vue操纵DOM时，就需要销毁Vue，也就是清除vue实例与DOM的关联，调用destroy方法可以销毁当前组件。在销毁前，会触发beforeDestroy钩   子函数。
- destroyed:销毁之后。在销毁后，会触发destroyed钩子函数。 

### 4. Vue指令

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


### 5. 事件修饰符

- .self只点元素本身时才触发事件
- .stop阻止冒泡事件
- .prevent阻止默认事件
- .once对应函数只触发一次
- .capture在捕获阶段触发二级绑定事件
- .passive优先执行默认事件（滚动行为）

### 6. 表单修饰符

- .number转化为数字，类似parse转化
- .trim去字符串前后空格

### 7. directives自定义指令

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

### 8. vue-router路由传参

> 提供了两种传参方式:
> - query传参（问号传参）
>  路由映射表不用改动 :to={path:'',query:{}}或者:to={name:'',query:{}}
> - params传参（路径传参）
>  在映射表中添加  /:变量  的形式； :to={name:'',params:{变量:''}}}


### 9. 接口请求一般放在哪个生命周期中？

接口请求一般放在mounted中，但需要注意的是服务端渲染时不支持mounted，需要放到created中。

### 10. Computed和Watch区别

- Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。
  适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。
- Watch没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用unWatch手动注销哦。

### 11. v-if和v-show的区别

当条件不成立时，v-if不会渲染DOM元素，v-show操作的是样式(display)，切换当前DOM的显示和隐藏。

### 12. 组件中的data为什么是一个函数？

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

### 13. Vue模版编译原理

简单说，Vue的编译过程就是将template转化为render函数的过程。会经历以下阶段：

- 生成AST树（解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)）
- 优化
- codegen

### 14. keep-alive作用

keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载。
常用的两个属性include/exclude，允许组件有条件的进行缓存。
两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。
keep-alive的中还运用了LRU(Least Recently Used)算法。

### 15. 性能优化

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


### 16. Vuex

- 概念
> Vuex 是一个专为 Vue应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
- 结构
> State ---单一状态
> Getter --- Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
> Mutation --- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
> Action --- Action 提交的是 mutation，而不是直接变更状态， Action 可以包含任意异步操作。
> Module --- Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。


## 第三部分. React

### 1. 概念

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。

### 2. 生命周期

- componentWillMount: 在渲染前调用,在客户端也在服务端。
- componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
- componentWillReceiveProps: 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
- shouldComponentUpdate: 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
  可以在你确认不需要更新组件时使用。
- componentWillUpdate:在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
- componentDidUpdate: 在组件完成更新后立即调用。在初始化时不会被调用。
- componentWillUnmount:在组件从 DOM 中移除之前立刻被调用。



### 3. React路由传参

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

### 4. 直接输出HTML方法

```javascript

<div  dangerouslySetInnerHTML={{ __html: item.info}}></div>

```


## 第四部分. Vue&React

### 1. 为什么说Vue 的响应式更新比 React 快？

- Vue (响应式+依赖收集)对于响应式属性的更新，只会精确更新依赖收集的当前组件，个组件都有自己的渲染 watcher，而不会递归的去更新子组件。
- React 在类似的场景下是自顶向下的进行递归更新的，也就是说，React 中假如 ChildComponent 里还有十层嵌套子元素，那么所有层次都会递归的重新render（在不进行手动优化的情况下），这是性能上的灾难。（因此，React 创造了Fiber，创造了异步渲染，其实本质上是弥补被自己搞砸了的性能）。他们能用收集依赖的这套体系吗？不能，因为他们遵从Immutable的设计思想，永远不在原对象上修改属性，那么基于 Object.defineProperty 或 Proxy 的响应式依赖收集机制就无从下手了（你永远返回一个新的对象，我哪知道你修改了旧对象的哪部分？）同时，由于没有响应式的收集依赖，React 只能递归的把所有子组件都重新 render一遍（除了memo和shouldComponentUpdate这些优化手段），然后再通过 diff算法 决定要更新哪部分的视图，这个递归的过程叫做 reconciler，听起来很酷，但是性能很灾难。


## 第四部分. 浏览器

### 1. 从输入 url 到展示的过程

- DNS 解析
- TCP 三次握手
- 发送请求，分析 url，设置请求报文(头，主体)
- 服务器返回请求的文件 (html)
- 浏览器渲染 



## 参考资料

- [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上) - 掘金](https://juejin.im/post/5c64d15d6fb9a049d37f9c20#heading-30)
- [JavaScript 面试 20 个核心考点 ](https://mp.weixin.qq.com/s?__biz=MzU3MDAyNDgwNA==&mid=2247484912&idx=1&sn=4b91963d14bfc9f5d7799525bebf423c&scene=19#wechat_redirect)




