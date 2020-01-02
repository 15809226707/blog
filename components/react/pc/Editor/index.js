import React, { Component } from "react";
import PropTypes from "prop-types";
import E from "wangeditor";
import env from "../../env"

import "./index.less";

const EDITOR_IMAGE_UPLOADER = `${env.BASE_API}/news/upload`;
const DEFAULT_TOOLBAR_CLASS = "cl_editor_toolbar_default";
const DEFAULT_CONTENT_CLASS = "cl_editor_content_default";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.editor = null;
    }

    componentDidMount() {
        this.initEditor()
        //赋值延迟处理
        setTimeout(() => {
            if (this.props.contentElement) {
                this.setHtml(this.props.contentElement)
                if (this.props.onChange) {
                    this.props.onChange(this.props.contentElement);
                }
            } else {
                this.setHtml(`<p>${this.props.placeholder}</p>`)
            }
        }, 1000)
    }

    initEditor = () => {
        this.editor = new E(
            `.${this.props.toolbarCls}`,
            `.${this.props.contentCls}`
        );

        // 配置编辑区域的 z-index
        this.editor.customConfig.zIndex = 10;
        // focus & blur
        this.editor.customConfig.onfocus = () => {
            const contentEle = document.querySelector(`.${this.props.contentCls}`);
            contentEle.style.minHeight = "300px";
            contentEle.style.height = "auto";
        };

        this.editor.customConfig.onblur = () => {
            const contentEle = document.querySelector(`.${this.props.contentCls}`);
            contentEle.style.height = "300px";
        };

        // 配置菜单
        this.editor.customConfig.menus = this.props.controls;

        this.editor.customConfig.onchange = html => {
            // html 即变化之后的内容
            if (this.props.onChange) {
                if (html !== `<p>${this.props.placeholder}</p>`) {
                    if (html === `<p><br></p>`) {
                        this.props.onChange('');
                    } else {
                        this.props.onChange(html);
                    }

                }
            }
        };
        this.editor.customConfig.onchangeTimeout = 300; // onchange 触发的延迟时间

        // 上传
        this.editor.customConfig.uploadImgServer = EDITOR_IMAGE_UPLOADER;
        this.editor.customConfig.uploadImgMaxLength = 5; // 一次最多上传5张图片
        // this.editor.customConfig.uploadImgParams = {
        //   access_token: window.localStorage.getItem("token")
        // };
        this.editor.customConfig.uploadFileName = "files";
        this.editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result) {
                const imgs = result.data.files;
                insertImg(imgs);
            }
        };

        // 对于word粘贴的文本做操作
        this.editor.customConfig.pasteTextHandle = function (content) {
            if (
                ~content.indexOf("<!--[if gte mso 9]><xml>") ||
                ~content.indexOf("<spanyes")
            ) {
                return "粘贴内容有乱码，请使用ctrl+shift+v来粘贴内容(mac请使用command+shift+v)";
            } else {
                return content;
            }
        };

        // 初始化内容
        this.editor.create();
        //默认有值和无值情况处理
        if (this.props.contentElement) {
            this.setHtml(this.props.contentElement)
            if (this.props.onChange) {
                this.props.onChange(this.props.contentElement);
            }
        } else {
            this.setHtml(`<p>${this.props.placeholder}</p>`)
        }

    };

    getHtml = () => this.editor.txt.html();

    getText = () => this.editor.txt.text();

    setHtml = html => this.editor.txt.html(html);

    render() {
        const toolbarClassName = this.props.toolbarCls
            ? `${this.props.toolbarCls} cl_editor_toolbar`
            : `${DEFAULT_TOOLBAR_CLASS} cl_editor_toolbar`;
        const contentClassName = this.props.contentCls
            ? `${this.props.contentCls} cl_editor_content`
            : `${DEFAULT_CONTENT_CLASS} cl_editor_content`;
        return (
            <React.Fragment>
                <div className={toolbarClassName} />
                <div className={contentClassName} />
            </React.Fragment>
        );
    }
}

Editor.defaultProps = {
    controls: [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
    ],
    placeholder: "内容编辑区域",
    toolbarCls: DEFAULT_TOOLBAR_CLASS,
    contentCls: DEFAULT_CONTENT_CLASS
};

Editor.propTypes = {
    controls: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    toolbarCls: PropTypes.string,
    contentCls: PropTypes.string
};

export default Editor;
