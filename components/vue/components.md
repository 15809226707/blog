 # Vue Components



## PC端-项目中常用组件封装

* ### [DivInput.vue](https://github.com/CloudEmperor/blog/blob/master/components/vue/pc/DivInput.vue)
> div标签通过contenteditable属性，模仿input输入框，实现数据双向绑定。
> 使用方法：
> ```javascript
> <template>
>  <div-input v-model="value"></div-input>
> </template>
>
><script>
>    import DivInput from '@/components/DivInput'
>    export default {
>       components: { DivInput},
>        data() {
>            return {
>                value:''
>            }
>        }
>   }
></script>
>```
