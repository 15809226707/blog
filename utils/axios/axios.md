 # Axio二次封装函数





* ### [Axios](https://github.com/CloudEmperor/blog/blob/master/utils/axios/axios.js)
>
> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。为了方便使用做二次封装
> 
>
>
>
> 全局使用：
>
> ```javascript
>
>  //main.js文件引入并继承到vue原型上
>
>  import { post, get, patch, put, del, AP_URL } from './utils/axios'
>
>  Vue.prototype.API_URL = API_URL
>  Vue.prototype.$post = post
>  Vue.prototype.$get = get
>  Vue.prototype.$patch = patch
>  Vue.prototype.$put = put
>  Vue.prototype.$del = del
>  
>                           
>
>```
>
>```javascript
>
> //页面使用
>   this.$get('/api', {id: '111111111'}).then(res=>{
>                       
>            })
>
>```
