# goods-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev 这是运行命令

# build for production with minification
npm run build 这是打包工具

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
##制作首页APP组件
 1、完成Header 区域 使用的是Mint-UI中的Header组件
 2、制作底部的Tabbar 区域 使用的是MUI的Tabbar 组件
    a、在制作底部导航购物车时  使用引入icons-extra.css 文件 同时依赖的文件fonts文件夹下的两个文件
 3、中间内容区域 防治一个router-view 展示路由匹配到的组件
 4、设置路由高亮 linkActiveClass为‘mui-active’
##点击tabbar 中的路由连接 展示对应的路由组件 
##加载首页轮播图图片数据 vue-resource 数据在body内部 判断body.status是否等于0
##制作nvbar 改造九宫格样式