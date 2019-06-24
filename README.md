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
##制作新闻资讯页面 配置路由 
 1、使用vue-rosource获取数据
 2、渲染页面数据
 3、使用media-list渲染数据
 4、实现新闻列表点击跳转新闻详情
  a、把列表中的每一项改造为router-link 在跳转的时候应该提供唯一的id修饰符 
  b、创建新闻详情的组件页面 NewsInfo.vue
  c、在路由模块中 将新闻详情 路由地址 和组件页面链接起来
##新闻详情页面 和数据渲染
  1、根据id进行页面信息渲染
  ##单独封装一个comment.vue 评论子组件
   1、先创建一个单独的comment 组件模板
   2、在需要使用comment 组件页面中 手动导入进去 import 导入
   3、在父组件中使用components 属性 将导入组件 注册
   4、将注册的名称在页面中引入即可
   ##获取所有数据 渲染页面中
   ##实现点击加载更多评论功能
    1、为加载更多提供点击事件
    2、点击加载更多 让pageIndex 自动叠加 重新调用获取数据方法
    3、   this.commentoinfo=this.commentoinfo.concat(result.body.message)数组拼接 保证新数据不把老数据覆盖
  ##发表评论
    1、把文本框做双向数据绑定
    2、为发表按钮绑定个事件
    3、效验评论内容是否为空 如果为空 则Toast 提示用户 评论内容不能为空
    4、vue-resource 发送一个请求 列表刷新
    5、如果调用getComment 方法可能 只能得到最后一个的评论 
       当评论成功后 在客户端  手动拼接出一个 最新的评论对象 然后调用 数组的 unshift 方法 把最新的评论追加到data中commentoinfo的开头
  ##改造图片分享 建立路由链接    
  ##绘制图片列表组件页面结构 
  1、顶部的滑动条
  2、制作底部的图片列表
  ##制作顶部滑动条
  1、使用mui 中tab-top-webview-main.html
  2、滑动条 通过引入mui-ui js文件 初始化方可 （官网文档说明）
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
  3、初始化滑动条的时候 导入js文件 控制台报错 
  【Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them】
   严格模式下 两者冲突
   解决方案 把webpack 严格模式禁用
    1、npm install --save-dev babel-plugin-syntax-dynamic-import
    2.在.babelrc文件根目录处添加 "ignore": [ "./src/lib/mui/js/*.js" ]
    3、配置app.vue 底部导航 样式
       /* 该类名，解决 tabbar 点击无法切换的问题 */
.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
  ##顶部滑动条获取数据
   1、根据选中ID值动态添加页码渲染默认样式
       :class="['mui-control-item',item.id===14?' mui-active':'']"
  ##制作图片列表区域
  1、图片列表需要使用懒加载技术 我们可以使用 mint-ui 提供现成的组件  lazy-load
  2、根据  lazy-load 的使用文档 合理配置使用
  3、渲染图片列表数据
  ##获取图片信息详情
  1、根据父级页面的链接的点击 获取图片的ID 
  2、根据路由链接传值 使用 $route.params.id获取ID值
  ##实现图片详情中缩略图功能 #########不可加soped
  1、使用插件 vue-preview   npm i vue-preview -S
  2、获取所有图片列表 然后使用v-for 渲染图片
  3、img 标签内 class 属性不能去除
  4、每个图片数据对象中国 必须有 w h 属性

  <!-- 代码展示 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>

    // 获取缩略图
    getlistinfo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环图片遍历添加宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          this.list = result.body.message;
          // console.log(this.list);
        } else {
          Toast("获取信息失败");
        }
      });
    }
.photoinfo .thumbs {
  display: flex;
}
.thumbs > div {
  width: 100%;
}
.thumbs .my-gallery {
  display: flex;
  flex-wrap: wrap;
}
.my-gallery figure {
  margin: 10px;
  box-shadow: 0 0 10px #ccc;
}
.thumbs .my-gallery figure img {
  width: 100px;
  vertical-align: middle;
}
###商品购买页面制作 页面基本结构布局
##https://github.com/zhang123ming/vue-goods-demo.git