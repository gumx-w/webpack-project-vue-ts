## 前言

通过再次从零开始搭建 webpack 的 vue-typescript 框架，实践一些最近新看的东西。
* webpack 的基本概念。
* webpack 的基本配置。
* webpack 的常用配置场景。


## 初始化 + 基础环境搭建

### 1. 初始化 package.json

* 初始化 Git 仓库，用于记录版本版本信息 `git init`。

* 只设置了author 信息，以及项目描述 `npm init`。

* 准备一个最简单的 vue 文件目录，包括 public/index.html、src/view/home.vue、src/mian.js

### 2. 创建项目目录，引入 webpack，并书写 webpack 基本配置

* 引入 webpack 4.0 需要同时引入 webpcak-cli。

```
cnpm i --save-dev webpack webpack-cli
```

* 基本配置。

config 文件夹用于 webpack 的配置文件，配置文件采用导出函数的方式实现，实现了基本的输入、输出配置和环境配置：

```
        mode: isProduction ? 'production' : 'development',//模式
        devtool: isProduction ? 'source-maps' : 'inline-source-map',//配置参考：https://www.webpackjs.com/configuration/devtool/
        entry: {
            main: getReslovePath('src/main.js')
        },
        output: {
            filename: '[name].[hash:8].js',
            chunkFilename: '[name].[hash:8].js',
            path: getReslovePath('dist'),
            publicPath: './'
        },
```


* 向 package.json 添加打包命令。

 ```
 webpack --config config/webpack.config.js --env.production
 ```
 
 其中 `--env.production` 用于指定构建环境（开发/生产）。


### 3. 引入 vue、vue-loader、vue-template-compiler 实现 Vue 的基础配置。

```
cnpm install -D vue vue-loader vue-template-compiler
```

vue-loader 职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。

其中 vue-template-compiler 的作用是将 html template 转化成 render 函数、实现 css 的 scoped 功能和模块化功能、 template 的 HMR 支持、装饰器语法的支持（例如：vue-class-component 的支持）

并且 vue-loader 依赖 vue-template-compiler。

添加的配置包括：

```
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        }
```


**注意：** vue-template-compiler 的版本号必须和当前引入的 vue 的版本号一致。因为通过它编译的 render 函数最终是应用于当前的 vue 环境的。

### 4. 引入 `clean-webpack-plugin` 、`html-webpack-plugin`插件

配置打包前清空输出目录，以保证每一次打包后的输出目录都是纯净的。

将打包的结果引入到 html 文件,该插件还具有携带参数到 html 文件的功能。

至此，已经完成了一个最简单的 vue 文件的打包功能。

控制台执行 `npm run build` 打包，验证是否正确。

```
 $ npm run build
 webpack --config config/webpack.config.js --env.production

Hash: 131f04aaeb0ce90d55ce
Version: webpack 4.31.0
Time: 1194ms
Built at: 2019-05-14 10:17:10
               Asset       Size  Chunks             Chunk Names
          index.html  339 bytes          [emitted]
    main.131f04aa.js   1.01 KiB       0  [emitted]  main
main.131f04aa.js.map    4.6 KiB       0  [emitted]  main
Entrypoint main = main.131f04aa.js main.131f04aa.js.map
[0] ./src/main.js 59 bytes {0} [built]
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [0] ./node_modules/_html-webpack-plugin@3.2.0@html-webpack-plugin/lib/loader.js!./public/index.html 506 bytes {0} [built]
    [2] (webpack)/buildin/global.js 472 bytes {0} [built]
    [3] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 1 hidden module

```



