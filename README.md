### 关于项目
公司即将开发小程序，调研mpvue技术栈开发小程序可行性，使用mpvue仿豆瓣电影项目。

### 技术栈
mpvue + vant weapp 

### 项目截图
<img src="http://www.liubaitong.com/images/screen/wx_douban.gif" width="375" height="600"/> 

### 记录的一些问题

###  引入第三方组件库
+ 将npm下载包中的dist目录放到项目static目录下
+ 配置对应组件
```
"usingComponents": {
  "van-button": "/path/to/vant-weapp/dist/button/index"
}
```
+ 直接使用
```
<van-button type="primary">按钮</van-button>
```

### ios下小程序无法正确显示webp格式图片
 
### 小程序不支持 nth-of-type等css3选择器

### 小程序 image跟view标签上下会有间隙
+ 将图片转换为块级对象 设置img display:block
+ 设置图片的垂直对齐方式  即设置图片的vertical-align属性为“top，text-top，bottom，text-bottom”一项也可以解决(推荐)

### 小程序 跳转路由方法
> wx.navigateTo 不能跳转到tabbar的页面，注意区分，使用wx.switchTab跳转tabbar页面

### 引入vant weapp组件库的操作反馈类组件
+ app.json配置（如上）
+ import引入
```
import Toast from '@/../static/vant/toast/toast';
```

###  event不同
> 值得注意的是，mpvue中获取event值与原生小程序有所不同。举例

```
onChange(event){ // 获取表单组件filed的值
  console.log(event.mp.detail) // 注意加入mp
}
```

### webpack sass-resources-loader配置scss文件当做全局变量
配置sassResourceLoader在utils.js 参考该文件下配置

### 关于小程序原生scroll-view的坑（横向滚动）
#### 横向滚动一定要设置以下两项，不然横向滚动无法生效(猜测内部组件未完全控制样式)
+ 一定要将scroll-view容器设置宽度,并设置white-space: nowrap;
+ 一定要将scroll-view容器的每一项都设置宽度和display:inline-block

### mpvue坑
+ 多个页面使用created，小程序加载时会一次性将所有页面的created全部执行，使用mounted或者小程序生命周期onLoad、onReady代替
+ 在渲染模板中调用methods方法改变数据时，返回的是空字符串。使用computed或者使用toFormat动态改变数据
+ 即使行内标签，经过mpvue转化后会转化成小程序view标签，需要设置样式转成行内，例如em标签（为啥不是转成text标签） 
+ 当前mpvue版本 :style 中使用字符串模版不兼容, 转化生成小程序代码依然是字符串模板，跟踪issues的答复
```
  <span :style="{'width' : `${score}%`"></span>
```
```
<template>
  <view v-for="item in arr" >
    {{format(item)}}     //空字符串
  </view>
</template>

<script>
export default {
  data(){
    return{
      arr:[]
    }
  },
  methods: {
    format(item){
      return item.toFixed(2)
    },
    toFormat(){
      let arr = [3.255,4.1,5,15]
      arr.map(item => {
        return item.toFixed(2)
      })
      this.arr = arr
    }
  }
</script>
 
```

# douban-movice

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
