 # Vue Components


## PC-Mobile项目公用组件封装

---

* ### [SvgIcon.vue](https://github.com/CloudEmperor/blog/blob/master/components/vue/public/SvgIcon.vue)
>
> 针对Svg格式的Icon组件封装，使用时入口index.html文件引入Svg地址。
> 
>
>
>
> ```javascript
> <template>
>
>  <SvgIcon icon-class="icondatixitongguanli" size="20px"></SvgIcon>
>
> </template>
>
><script>
>    import SvgIcon from '@/components/SvgIcon'
>    export default {
>       components: { SvgIcon},
>        data() {
>            return {
>            
>            }
>        }
>   }
></script>
>``
>
>


---


## PC端-项目中常用组件封装

---

* ### [DivInput.vue](https://github.com/CloudEmperor/blog/blob/master/components/vue/pc/DivInput.vue)
>
> 项目中经常会遇到一些需求，需要input输入框的功能，但不需要他自带的样式。<br>
> 我们可以通过div标签的contenteditable属性，模仿input输入框，实现数据双向绑定，样式随意设置。
>
> 组件使用：
>
> ```javascript
> <template>
>
>  <div-input v-model="value"></div-input>
>
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


---

* ### [Editor.vue](https://github.com/CloudEmperor/blog/blob/master/components/vue/pc/Editor.vue)
>
> wangEditor —— 轻量级 web 富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。<br>
> 为了方便项目中使用，特将wangEditor封装成组件。
>
> - 官网：[www.wangEditor.com](www.wangEditor.com)
> - 文档：[www.kancloud.cn/wangfupeng/wangeditor3/332599](www.kancloud.cn/wangfupeng/wangeditor3/332599)
> - 源码：[github.com/wangfupeng1988/wangEditor](github.com/wangfupeng1988/wangEditor)
>
>```javascript
>
> //npm安装
>
> npm install wangeditor
>
>```
>
> 组件使用：
>
> ```javascript
> <template>
>
>   <editor v-model="htmlText"  :input-content="introduction"> </editor>         
>
> </template>
>
><script>
>    import Editor from '@/components/Editor'
>    export default {
>       components: { Editor},
>        data() {
>            return {
>                htmlText:'',
>                introduction:'' //默认赋值
>            }
>        }
>   }
></script>
>```
>
>


---


## mobile-项目中常用组件封装

---

* ### [Calendar.vue](https://blog.csdn.net/weixin_38008863/article/details/90409612)
>
> vue移动端日历组件封装
>
>

>
>

---