<template lang="html">
    <div ref="editor" class="editor" @input="outputContent" ></div>
</template>

<script>
import E from 'wangeditor'
export default {
    name:'Editor',
    props:{
      inputContent:{ //默认赋值
          type:String,
          default:''
      } 
    },
    data() {
        return {
            editor:null,
            editorContent: '',   
            menus :[
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo',  // 重复
            ],
            uploadUrl:`${this.API_URL}/system/file/upload?x-token=${localStorage.getItem("x_token")}`
        }
    },
    mounted() {
        this.createEditor()
    },
    watch:{
        inputContent(curVal){
           this.editor.txt.html(curVal);
        }
    },
    methods: {
        createEditor(){
            const self = this
            const editor = new E(self.$refs.editor)
            
            self.editor=editor;
            editor.customConfig.menus=self.menus
            editor.customConfig.zIndex = 0;
            editor.customConfig.onchange = (html) => {
                self.outputContent(html)
            }
            editor.customConfig.uploadImgServer = self.uploadUrl; //上传URL
            //editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;
            //editor.customConfig.uploadImgMaxLength = 20;    
            editor.customConfig.uploadFileName = 'file';
            // editor.customConfig.uploadImgParams = {
            //     token: 'abcdef12345'
            // }
            // 转义编辑word文档格式转成文本类型
            editor.customConfig.pasteTextHandle = function (content) {
                // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
                if (content == '' && !content) return ''
                var str = content
                str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
                str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
                str = str.replace(/<\/?[^>]*>/g, '')
                str = str.replace(/[ | ]*\n/g, '\n')
                str = str.replace(/&nbsp;/ig, '')
                return str
            }
            editor.customConfig.uploadImgHooks = {
                customInsert: (insertImg, result, editor) => {             
                        const url =result.data.url;
                        insertImg(url);              
                    }
            }
            editor.customConfig.customAlert = function (info) {
                //alert('插入图片错误')
                console.log(info)
            }
            editor.create();

        },
        outputContent(content) {
            this.$emit('input', content)
        }
    }
}
</script>
<style lang="scss">
   .editor{
       text-align:left;
       .w-e-toolbar .w-e-menu i{
            color: #333;
            font-size: 16px;
        }
   }
</style>