# Vue中使用debounce防抖的正确姿势

## 1. 防抖 (debounce)

概念：将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可

## 2. 函数封装

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

## 3. 使用方式

此处例子是用div模拟input框写的一个组件。使用的是lodash自带的debounce函数，也可以用自己封装好的debounce函数，本质是一样的。


### lodash官方文档

lodash官方debounce地址：[https://www.lodashjs.com/docs/lodash.debounce](https://www.lodashjs.com/docs/lodash.debounce)

```javascript

/**
*
*func (Function): 要防抖动的函数
*[wait=0] (number): 需要延迟的毫秒数
*[options={}] (Object): 选项对象
*
**/

_.debounce(func, [wait=0], [options={}])


```


### 错误用法

- Vue原型链上挂载lodash：

```javascript

 changeText(e){
     this.debounce((e)=>{
        this.$emit('input',e.target.innerText); 
   }, 500)
 }

```

在main.js中引入Vue原型链上的lodash，在组建中this是取不到lodash的。因为lodash是挂到vue组件实例上的，但组件声明时实例还没被创建出来。

如果不想写import lodash，就只能在created生命周期里，为当前实例写一个新的method上去。

- 组件内引用lodash并采用箭头函数写法：

```javascript

import _ from 'lodash'

export default {
    methods: {  
      changeText(e){
            _.debounce((e)=>{
                    this.$emit('input',e.target.innerText); 
            }, 500)
        }
    }
}
 

```

以上，debounce第一个参数写成箭头函数就取不到this。vue原始的methods声明写法：search(){}，

这个写法等价于search: function(){}，你一样不能写成search: () => {}（这一点vue文档里在methods和watch上都有强调）。

因为箭头函数中的this指向了父级作用域的上下文。如果改成箭头函数，也就指向了当前这个vue组件声明的上下文（就是写import、export的这一层作用域）。

debounce的用法是传入一个函数source function，返回一个被包装好的新函数debounced function。

去抖效果需要通过反复调用这个被包装好的debounced函数体现。

这个写法相当于每次执行search，都拿到了一个新包装的函数，每次都只调用这个新函数一次，当然就没效果。

### 正确用法

```javascript

<template>
    <div 
        class="edit-input" 
        :style="{'font-size':fontSize}"
        v-html="innerText"
        :contenteditable="isEdit"
        @focus="isLock = true"
        @blur="onBlur"
        @input="changeText"
        >
    </div>
</template>

<script>

import _ from 'lodash'

export default {
    methods: {  
        // 使用注意：
        //debounce第一个参数不能写成箭头函数
       changeText:_.debounce(function(e){
                this.$emit('input',e.target.innerText); 
        }, 500)
    }
}
 

</script>

```

## 4. 完整组件

完整组件源码：[https://github.com/CloudEmperor/blog/blob/master/components/vue/pc/DivInput.vue](https://github.com/CloudEmperor/blog/blob/master/components/vue/pc/DivInput.vue)

完整组件DivInput.vue用法：[https://github.com/CloudEmperor/blog/blob/master/components/vue/components.md](https://github.com/CloudEmperor/blog/blob/master/components/vue/components.md)


