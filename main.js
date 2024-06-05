import App from './App'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
 
import { $http } from './utils/http.js'
uni.$http = $http
// 配置请求根路径
//$http.baseUrl = 'https://api.douban.com/v2'
$http.baseUrl = 'http://175.178.126.10:8000/api/v1'
uni.$apiKey = '0ab215a8b1977939201640fa14c66bab'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
 
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

//mock数据，用于测试接口
//import {mockTest} from './mock/test.js'
//mockTest()

