import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import Router from 'vue-router'

import Element from 'element-ui'
// yarn add animate.css
import animated from 'animate.css'
// yarn add font-awesome
import 'font-awesome/css/font-awesome.css'
// yarn add vue-bus
import VueBus from 'vue-bus'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/style/all.scss'

import filters from '@/utils/filters'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(animated)
Vue.use(VueBus)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
Vue.config.devtools = process.env.NODE_ENV === 'development'
// 解决相同路径跳转报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

store.dispatch('menu/setMenu')
// store.dispatch('article/setArticleRank')

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

// 全局过滤器
for (const key in filters) {
  Vue.filter(key, filters[key])
}
