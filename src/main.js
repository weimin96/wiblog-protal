import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import store from './store'
import Router from 'vue-router'

Vue.config.productionTip = false
Vue.use(Element)
// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}
// 解决相同路径跳转报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
