
# React Native开发- 搭建React Native开发环境



官方文档 ：[https://reactnative.cn/docs/getting-started](https://reactnative.cn/docs/getting-started)


Windows & Android 需要的环境：

- [Node](https://nodejs.org/en/download/) ：

Node 是 JS 的运行环境,这里注意需要下载的 Node 版本需要8.3以上。

- [Python 2](https://www.python.org/downloads/) ：

Python 2的运行环境，这里注意需要下载的python版本为 python 2.x ，不能是 python 3.x。

- [JDK](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html) ：

Java的运行环境，这里注意需要下载的JDK版本为1.8，只能是1.8。


## 1. 环境配置

### 1-1. 安装NodeJs

由于React Native中有一些工具，例如react-native-cli，是要npm来安装，所以先得安装NodeJs。对于NodeJs的版本要求是必须高于8.3。

打开NodeJs的官网下载页面：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

直接下载最新版本，可以下载绿色解压版本，也可以下载安装版本。按自己系统位数选择下载并安装


### 1-2. 安装Python2

注意Python的版本必须是2.x系列的。

Python的官网下载地址为：[https://www.python.org/downloads/](https://www.python.org/downloads/)

也是直接下载2.x系列的最新版本。下载下来的一个安装文件，直接一步一步安装即可。

### 1-3. 安装 JDK

React Native要求JDK的版本为1.8。

官网的下载地址为：[https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

选择本系统合适的版本，下载下来的一个安装文件，直接一步一步安装即可。

### 1-4. 安装Android环境

安装Android环境，首先先安装Android Studio。

下载地址为：[http://www.android-studio.org/index.php/download](http://www.android-studio.org/index.php/download)

下载下来的是一个可安装程序，点击安装即可，在点击“Next”过程，有一步需要指定Android SDK的路径，如果之前电脑中已经存在SDK，可以指定该路径，后续就可以不用下载SDK；由于本地没有安装过SDK的场景，这里暂时可以指定一个

后续将保存SDK的路径。

点击“Finish”后，开始自动下载SDK，此时根据网速的快慢，决定这个步骤的时间的长短，下载完成后，则会进行Android Studio的欢迎画面。

### 1-5. 配置ANDROID_HOME环境变量

React Native 需要通过环境变量来了解你的 Android SDK 装在什么路径，从而正常进行编译。


- a.创建ANDROID_HOME环境变量：

打开控制面板 -> 系统和安全 -> 系统 -> 高级系统设置 -> 高级 -> 环境变量 -> 新建，创建一个名为ANDROID_HOME的环境变量（系统或用户变量均可），指向你的 Android SDK 所在的目录。
SDK 默认是安装在下面的目录：

```

c:\Users\你的用户名\AppData\Local\Android\Sdk

```

你可以在 Android Studio 的"Preferences"菜单中查看 SDK 的真实路径，具体是Appearance & Behavior → System Settings → Android SDK。

你需要关闭现有的命令符提示窗口然后重新打开，这样新的环境变量才能生效。
- b.把一些工具目录添加到环境变量 Path 中：

打开控制面板 -> 系统和安全 -> 系统 -> 高级系统设置 -> 高级 -> 环境变量，选中Path变量，然后点击编辑。

点击新建然后把这些工具目录路径添加进去：platform-tools、emulator、tools、tools/bin

```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin

```

## 2. 创建项目

### 2-1. 安装React-Native-Cli

React-Native-Cli工具是要通npm来安装，即在cmd窗口中输入如下命令：

```
npm install -g react-native-cli

```

### 2-2. 在cmd命令中执行如下如下命令，创建一个reactNativeDemo的项目，即：

```
react-native init reactNativeDemo

```

注意：在哪个目录下执行该命令，就会在该目录创建项目。

## 3.Android 设备

### 3-1. 使用 Android 真机

你也可以使用 Android 真机来代替模拟器进行开发，只需用 usb 数据线连接到电脑，然后遵照在设备上运行这篇文档的说明操作即可。

文档地址：[https://reactnative.cn/docs/running-on-device](https://reactnative.cn/docs/running-on-device)

### 3-2. 使用 Android 模拟器

你可以使用 Android Studio 打开项目下的"android"目录，然后可以使用"AVD Manager"来查看可用的虚拟设备。如果你刚刚才安装 Android Studio，那么可能需要先创建一个虚拟设备。点击"Create Virtual Device..."，然后选择所需的设备类型并点击"Next"，然后选择Pie API Level 28 image。
> 译注：请不要轻易点击 Android Studio 中可能弹出的建议更新项目中某依赖项的建议，否则可能导致无法运行。
> 如果你还没有安装 HAXM（Intel 虚拟硬件加速驱动），则先点击"Install HAXM"来进行安装。
然后点击"Next"和"Finish"来完成虚拟设备的创建。现在你应该可以点击虚拟设备旁的绿色三角按钮来启动它了，启动完后我们可以尝试运行应用。

特别注意的坑：

如果你的电脑是AMD处理器，HAXM是无法安装的。

解决办法请参考《解决AMD CPU 启动Android模拟器时无法安装Intel HAXM 的问题》博客：

[https://blog.csdn.net/a497785609/article/details/103832368](https://blog.csdn.net/a497785609/article/details/103832368)

按照此博客操作，最后一步命令行进入的路径：

```
//打开命令行进入以下路径（$ANDROID_SDK_ROOT是Android SDK的安装路径）

$ANDROID_SDK_ROOT\extras\google\Android_Emulator_Hypervisor_Driver

//我电脑实际路径如下

C:\Users\WIN10\AppData\Local\Android\Sdk\extras\google\Android_Emulator_Hypervisor_Driver

```

## 4. 编译并运行 React Native 应用

确保你先运行了模拟器或者连接了真机，然后在你的项目目录中运行android或者react-native run-android：

```

cd reactNativeDemo

react-native run-android

```


## 5. 项目添加相关依赖包

### 5-1. 路由配置

```
npm install react-navigation --save
npm install react-native-gesture-handler --save
npm install react-native-vector-icons --save //（日后配置底部导航会用到）

```

具体参考博文:
- react-native项目的新建以及路由配置：[https://www.jianshu.com/p/26bae1ca0c2c](https://www.jianshu.com/p/26bae1ca0c2c)
- react-navigation导航组件使用详解:[https://blog.csdn.net/kisty_yao/article/details/105363598](https://blog.csdn.net/kisty_yao/article/details/105363598)

### 5-2. Axios

```
npm install  --save axios

```

### 5-3. Redux

```
npm install --save redux
npm install --save react-redux
npm install --save redux-thunk

```



