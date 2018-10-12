# scanner

> A Vue.js project

## Build Setup

``` bash
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

npm v4.1.2    node v5.0.0   webpack v2.3.0环境下运行正常。（仅做参考）
项目应用了vue-cli脚手架，同时整合了vue-router路由，引入了微信jssdk。使用vuex做状态管理。

1、使用options工具函数初始化图表时，需设置3项
  （1）设置容器ref
  （2）引入chartinit工具函数
  （3）监控数据，并初始化图表
