// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

import axios from 'axios'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.prototype.$axios = axios // 将axios挂载在Vue实例原型上

// 设置axios请求的token
// axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'

// axios.defaults.baseURL = 'http://localhost:54184/'
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 配置请求头（推荐）
// axios.defaults.withCredentials = true // axios 默认不发送cookie，需要全局设置true发送cookie

Vue.use(ElementUI)

/* 区分关闭和刷新，关闭退出登录 start */
/* window.onload = function () {
  alert('onload')
}
window.onunload = function () {
  alert('onunload')
}
window.onbeforeunload = function () {
  alert('onbeforeunload')
} */

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.path === '/login') {
    next()
    NProgress.done()
  } else {
    if (store.getters.username) {
    // if (to.path !== '/login') {
      next()
    } else {
      next({path: '/login'})
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.onunload = function () {
  alert('关闭')
}
