import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken } from '@/projects/onemap/utils/auth' // 验权
import { Message } from 'element-ui'
import Vue from 'vue'

const whiteList = ['/login', '/transfer', '/whPage', '/jumpPage', '/taskDetail', '/startProgress'] // 不重定向白名单
// eslint-disable-next-line space-before-function-paren
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const _token = getToken()
  if (_token) {
    // todo: add query to other page
    if (to.path === '/login') {
      next({ path: '/home' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (!store.getters.userInfo) {
        // store.dispatch('user/getDictionary')
        // const deptId = store.getters.userInfo.dept_id
        // const unitCode = store.getters.userInfo.unit_code
        // await store.dispatch('user/getDataAuth')
        const { menus } = await store.dispatch('user/getCurrentUser')
        const userInfo = await store.getters.userInfo
        // console.log(userInfo, 'userInfo')
        await store.dispatch('user/getOrgDetail', userInfo)
        if (menus.length > 0) {
          const accessRoutes = await store.dispatch('permission/generateRoutes', menus)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
          // next(to)
        } else {
          store.dispatch('user/logout')
          Message({
            type: 'warning',
            message: '您没有访问权限，请联系管理员！'
          })
          NProgress.done()
        }
      } else {
        // await store.dispatch('user/getCurrentUser')
        next()
      }
    }
  } else {
    if (to.path !== '/login' && to.path !== '/transfer' && to.path !== '/' && !Vue.prototype.menuIsShow) {
      store.dispatch('user/login', { username: 'HN_ua', password: '123' }).then(async () => {
        store.dispatch('user/getDictionary')
        await store.dispatch('user/getCurrentUser')
        const { menus } = await store.dispatch('user/getCurrentUser')
        const userInfo = store.getters.userInfo
        await store.dispatch('user/getOrgDetail', userInfo)
        if (menus.length > 0) {
          const accessRoutes = await store.dispatch('permission/generateRoutes', menus)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
          // next(to)
        } else {
          store.dispatch('user/logout')
          Message({
            type: 'warning',
            message: '您没有访问权限，请联系管理员！'
          })
          NProgress.done()
        }
      })
    } else if (whiteList.indexOf(to.path) !== -1) {
      // window.location.replace(Vue.prototype.VUE_APP_BASE_URL + '#/login')
      // window.location.replace('index' + '#/login')
      // window.location.replace('./index')
      setTimeout(() => {
        window.location.href = window.origin + '/' + (process.env.PRO_NAME ? process.env.PRO_NAME : '')
      }, 100)
      store.dispatch('user/FedLogOut')
      // next()
    } else {
      // window.location.replace('index' + '#/login')
      // next(`/login?redirect=${to.path}`)
      setTimeout(() => {
        window.location.href = window.origin + '/' + (process.env.PRO_NAME ? process.env.PRO_NAME : '')
      }, 100)
      store.dispatch('user/FedLogOut')
      // window.location.replace('./index')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
