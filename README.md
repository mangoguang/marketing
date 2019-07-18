# scanner

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

npm v4.1.2 node v5.0.0 webpack v2.3.0 环境下运行正常。（仅做参考）
项目应用了 vue-cli 脚手架，同时整合了 vue-router 路由，引入了微信 jssdk。使用 vuex 做状态管理。

1、使用 options 工具函数初始化图表时，需设置 3 项
（1）设置容器 ref
（2）引入 chartinit 工具函数
（3）监控数据，并初始化图表

##注意
此版本对 vue 版本进行了升级
适配向下兼容之前低版本，引入 postcss 适配 参照 iphone 375\*667 分辨率进行一比一适配
