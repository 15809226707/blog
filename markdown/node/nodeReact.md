# 全栈进阶之路（Node + React）

>前言：
>
>全栈是前端发展的大趋势，初次学习并实践Node.js,整个过程做一个学习记录。

>技术栈：
>
>后端--->
>- NodeJS
>- Express框架
>- MySQL数据库
>
>前端--->
>- React
>- Antd
>- Redux
>- Axios

## 一.安装配置Node.js

>此处只介绍一种Node.js安装的方式，在Windows上安装Node.js。
>
>[Node.js 安装包及源码下载地址为：https://nodejs.org/en/download/](https://nodejs.org/en/download/)。 
>
>选择适合自己电脑系统的 .msi 安装包 。下载完双击安装包，按照提示点击 next（下一步）完成安装。检查Node.js版本，使用git命令工具如出现以下界面说明安装成功：

```

$ node -v
v10.15.1

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

//或者

node bin/www

```
5. supervisor的安装(由于使用express 时每次更改保存代码的时候需要再一次重新的启动服务器，所以有时候采用xepress 进行开发的时候遇到的问题 往往是没有重启服务器造成的.采用supervisor 的好处是 每次更改代码的时候 会自动帮你 重新启动服务器，进行热更新。这样可以很方便我们使用express进行开发了。)

```
npm i supervisor -g

```
supervisor 启动项目命令：

```
supervisor bin/www 

```

然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了。

通过生成器创建的应用一般都有如下目录结构：

```
cloudEmperor-serve
│   app.js
│   package.json    
│
└───bin
|    │   www.js
|   
|
└───public
│    |   images
│    |   javascript
|    |   stylesheets
|           |___ style.css
|                
│   
└───routes
|    │   index.js
|    │   users.js
|
|
└───views
     │   error.jade
     │   index.jade
     |   layout.jade
    
```
>备注：
>将Vue或者React项目 build后生成的dist文件夹下的所有文件复制到express项目的publick文件夹下面，
>然后运行 npm start 来启动express项目，
>浏览器中打开 http://localhost:3000/就可以看到前端项目效果。
>如果要让局域网访问，修改localhost为本地地址，关闭防火墙。其他人访问你本地地址就可以了

```javascript
//修改localhost为本地地址,进入bin/www文件

server.listen(port);

//改为

server.listen(port, '192.168.1.114');  //192.168.1.114代表自己电脑IP

```

## 三.前端项目

前端项目采用React框架 + Ant Design搭建，具体配置不做多余阐述。

## 四.改造Express框架搭建的cloudEmperor-serve项目内容及结构，实现一个简单的登录完整请求及响应操作

1. 删除views整个文件夹，删除public里面的所有文件夹

```
cloudEmperor-serve
│   app.js
│   package.json    
|   public                 
│ 
└───bin
|    │   www.js  
|
|
└───routes
     │   index.js
     │   users.js



    
```

2. 修改routes下的 users.js文件名为 admin.js。里面内容更改如下：

```javascript
//改之前
var express = require('express');
var router = express.Router();

/* GET users listing. */
   router.get('/', function (req, res, next) {
     res.send('respond with a resource');
   });

module.exports = router;

//改之后
var express = require('express');
var router = express.Router();
var admin = require('../controllers/admin'); //统一用require方式引入,import不支持

router.post('/admin_login', admin.adminLogin); //用户登录

module.exports = router;  //统一用module.exports方式暴露, export default不支持

```

3. 在根目录下建文件夹 controllers -> admin -> index.js

```javascript
//controllers -> admin -> index.js 
//此处接收登录传参并对前端做出响应

class Admin{    
    adminLogin(req, res, next){
      //获取前端登录请求传的参数userName passWord        
      const { userName, passWord } = req.body;        
      res.send({            
          status: 200,            
          success: '登录成功',            
          data:{                
             userName: userName,  //用户名                
             avatar: ''    //用户头像          
              } 
           })   
       }};
module.exports = new Admin();

```

4. 修改routes下的 index.js文件内容

```javascript
//改之前
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {  
       res.render('index', { title: 'Express' });
    });
module.exports = router;

//改之后，此处做路由模块统一配置，引入路由模块admin
var admin = require('./admin');

module.exports= app =>{ 
 app.use('/admin', admin) //前端请求地址为 /admin/**(例如 http://192.168.1.117:3000/admin/admin_login)

}


```

5. 修改app.js

```javascript
//改之前
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//调用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

//改之后,删除无用的，引入路由

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./routes');

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

router(app);

module.exports = app;

```

6. 为了方便，将bin ->www.js修改

```javascript
//改之前,默认localhost
server.listen(port);

//改之后,添加自己本地电脑ip,方便访问
server.listen(port, '192.168.1.117');

```

7. 前端现在就可以发送登录请求，接收返回参数

```javascript
  handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                post('/admin/admin_login', values).then(res => {
                    if (res.status === 200) {
                        openNotification('success', res.message)
                        this.props.history.push('/demo')
                    } else {
                        openNotification('error', res.message)
                    }

                })
               
            }
        });
    }

```

## 五.MySQL数据库

1. 下载并安装MySQL

两种安装方式：

  - 正常安装，参考 [ Windows10 MYSQL Installer 安装](https://www.runoob.com/w3cnote/windows10-mysql-installer.html)
  - 免安装操作，参考 [Windows 上安装 MySQL ](https://www.runoob.com/mysql/mysql-install.html)

2. MySQL_Workbench 创建数据库和表,具体操作参考[初学者使用MySQL_Workbench 6.0CE创建数据库和表，以及在表中插入数据](https://blog.csdn.net/u011719449/article/details/12521437?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task)

此处创建数据库名字为 cloudemperor

```
npm install --save mysql

```

3. 连接数据库,在项目根目录下建 config -> db.js,配置数据库信息

```javascript

//db.js

const mysql = require("mysql");
//mysql数据库连接配置
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zhy554971375@",
  database: "cloudemperor" //数据库名
});

db.connect();

module.exports=db

```

数据库连接参数说明：

参数|描述
--|--
host               | 主机地址 （默认：localhost）
user               | 用户名
password           | 密码
port               | 端口号 （默认：3306）
database           | 数据库名
charset            | 连接字符集（默认：'UTF8_GENERAL_CI'，注意字符集的字母都要大写）
localAddress       | 此IP用于TCP连接（可选）
socketPath         | 接到unix域路径，当使用 host 和 port 时会被忽略
timezone           | 时区（默认：'local'）
connectTimeout     | 连接超时（默认：不限制；单位：毫秒）
stringifyObjects   | 是否序列化对象
typeCast           | 是否将列值转化为本地JavaScript类型值 （默认：true）
queryFormat        | 自定义query语句格式化方法
supportBigNumbers  | 数据库支持bigint或decimal类型列时，需要设此option为true （默认：false）
bigNumberStrings   | supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false）
dateStrings        | 强制timestamp,datetime,data类型以字符串类型返回，而不是JavaScript Date类型（默认：false）
debug              | 开启调试（默认：false）
multipleStatements | 是否许一个query中有多个MySQL语句 （默认：false）
flags              | 用于修改连接标志
ssl                | 使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串，目前只捆绑Amazon RDS的配置文件



>参考资料地址：
>
>[Node.js 教程 | 菜鸟教程: https://www.runoob.com/nodejs/nodejs-tutorial.html](https://www.runoob.com/nodejs/nodejs-tutorial.html)
>
>[Node.js 连接 MySQL](https://www.runoob.com/nodejs/nodejs-mysql.html)
>
>[MySQL 教程](https://www.runoob.com/mysql/mysql-tutorial.html)
>
>
