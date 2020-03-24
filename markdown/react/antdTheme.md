# create-react-app 配置antd 自定义主题


```

/*版本号*/
antd: "^3.24.0"
webpack: "4.41.0"
react: "^16.10.2"

```

## 一.官方定制主题方案

[Ant Design官方定制主题地址](https://ant.design/docs/react/customize-theme-cn)
antd的样式使用了 Less 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。
以下是一些最常用的通用变量，所有样式变量可以在 这里 找到。

```less

@primary-color: #1890ff; // 全局主色
@link-color: #1890ff; // 链接色
@success-color: #52c41a; // 成功色
@warning-color: #faad14; // 警告色
@error-color: #f5222d; // 错误色
@font-size-base: 14px; // 主字号
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
@disabled-color: rgba(0, 0, 0, 0.25); // 失效色
@border-radius-base: 4px; // 组件/浮层圆角
@border-color-base: #d9d9d9; // 边框色
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影

```
原理上是使用 less 提供的 modifyVars 的方式进行覆盖变量。废话不多说，我们开始实际操作

## 二. 安装babel-plugin-import 安装less-loader（如果antd按需加载和less-loader已配置，可跳过此步骤直接看第三步）

- 安装babel-plugin-import 
 
 ```

 npm install babel-plugin-import --save-dev

```
 ```javascript

 //修改webpack.config.js
 // Process application JS with Babel.
// The preset includes JSX, Flow, TypeScript, and some ESnext features.
{
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
    customize: require.resolve(
        'babel-preset-react-app/webpack-overrides'
    ),
    
    plugins: [
        [
        require.resolve('babel-plugin-named-asset-import'),
        {
            loaderMap: {
            svg: {
                ReactComponent:
                '@svgr/webpack?-svgo,+titleProp,+ref![path]',
            },
            },
        },
        ],
        [
        require.resolve('babel-plugin-import'), // 导入 import 插件
        { libraryName: "antd", style: 'css'} 
        ]
    ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    // See #6846 for context on why cacheCompression is disabled
    cacheCompression: false,
    compact: isEnvProduction,
    },
}

```

- 安装less-loader

 ```

 npm install less-loader --save-dev  

```
 ```javascript

//修改webpack.config.js 

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
//在这里增加less的全局变量
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

//找到配置sass-loader的sassModuleRegex位置，后面紧跟着添加如下代码

// Opt-in support for Less (using .less or .less extensions).
// By default we support Less Modules with the
// extensions .module.less or .module.less
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
    ),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
},
// Adds support for CSS Modules, but using lESS
// using the extension .module.less or .module.less
{
    test: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
    },
    'less-loader'
    ),
}

```


## 三.修改webpack.config.js文件

1. antd按需加载配置修改

```javascript

{ libraryName: "antd", style: 'css'}
//修改为
{ libraryName: "antd", style: true } 

```

2. 找到less-loader代码片段,增加antd自定义配置

```javascript

//antd自定义主题配置
const antdThemeOptions = {
        modifyVars: {
          "primary-color": "#A020F0 ",
          "link-color": "#A020F0 ",
          "border-radius-base": "4px"
        },
        javascriptEnabled: true
   };

//找到less-loader配置,传入 antdThemeOptions

// Opt-in support for Less (using .less or .less extensions).
// By default we support Less Modules with the
// extensions .module.less or .module.less
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader',
     antdThemeOptions

    ),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
},
// Adds support for CSS Modules, but using lESS
// using the extension .module.less or .module.less
{
    test: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
    },
    'less-loader',
    antdThemeOptions

    ),
}

```

3. 修改getStyleLoaders方法，添加antThemeOption参数配置

```javascript
 //修改前
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };

```

```javascript

//修改后
const getStyleLoaders = (cssOptions, preProcessor, antdThemeOptions) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            ...antdThemeOptions,
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };

```

---------END