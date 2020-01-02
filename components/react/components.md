 # React Components


## PC-Mobile项目公用组件封装

---

* ### [SvgIcon](https://github.com/CloudEmperor/blog/blob/master/components/react/public/SvgIcon/index.js)
>
> 针对Svg格式的Icon组件封装，使用时入口index.html文件引入Svg地址。
> 
>
>
>
> 组件使用：
>
> ```javascript
>
>  //引入
>
>  import SvgIcon from '../../components/SvgIcon'
>  
>
> <SvgIcon iconClass="icon-router" size="16px"></SvgIcon>
>                          
>   
>
>```
>
>


---


## PC端-项目中常用组件封装

---

* ### [Editor](https://github.com/CloudEmperor/blog/blob/master/components/react/pc/Editor/index.js)
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
>  //引入
>
>  import Editor from '../../components/Editor'
>  
>  //取值
>  editorChange= value =>{
>        console.log('value', value)
>    }
>
> <Editor  
>    onChange={this.editorChange} 
>    contentElement={this.state.content ? this.state.content : ''}   //赋值
>    placeholder="请在这里输入文章正文，包括文字、图片、视频等"  />
> 
>                          
>   
>
>```
>
>


---