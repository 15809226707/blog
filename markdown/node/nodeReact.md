# 全栈进阶之路（Node + React）

>前言：
>
>全栈是前端发展的大趋势，初次学习并实践Node.js,整个过程做一个学习记录。

## 一.安装配置Node.js

>此处只介绍一种Node.js安装的方式，在Windows上安装Node.js。
>
>[Node.js 安装包及源码下载地址为：https://nodejs.org/en/download/](https://nodejs.org/en/download/)。 
>
>选择适合自己电脑系统的 .msi 安装包 。下载完双击安装包，按照提示点击 next（下一步）完成安装。检查Node.js版本，使用git命令工具如出现以下界面说明安装成功：

```

$ node -v
v10.

```

## 二.Express框架安装

>Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
>使用 Express 可以快速地搭建一个完整功能的网站。
>[中文官网地址：https://www.expressjs.com.cn/](https://www.expressjs.com.cn/)

Express 框架核心特性：
-  可以设置中间件来响应 HTTP 请求。
-  定义了路由表用于执行不同的 HTTP 请求动作。
-  可以通过向模板传递参数来动态渲染 HTML 页面。

1. 用Express应用生成器工具 express-generator 可以快速创建一个应用的骨架。全局安装express-generator生成器。
```
npm install express-generator -g 

```
2. 创建项目cloudEmperor-serve
```
//项目名称 cloudEmperor-serve

express cloudEmperor-serve

```
3. 进入项目目录，安装相关项目依赖

```
cd cloudEmperor-serve
npm install

```
4. 启动项目

```
npm start 

```
然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了。

通过生成器创建的应用一般都有如下目录结构：

```
project
│   README.md
│   file001.txt    
│
└───folder1
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│   
└───folder2
    │   file021.txt
    │   file022.txt
```


## 三.前端项目

## 四.改造Express框架搭建的cloudEmperor-serve项目内容及结构，实现一个简单的登录完整请求及响应操作

## 五.数据库MongoDB
