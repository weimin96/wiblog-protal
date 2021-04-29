/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'

export const getBaseUrl = () => {
  return Vue.prototype.VUE_APP_HOST
}

// create an axios instance
const service = axios.create({
  baseUrl: getBaseUrl(),
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 200000 // request timeout
})
// 默认超时时间
service.defaults.timeout = 100000
// 返回其他状态码
service.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500
}
// 跨域请求，允许保存cookie
// service.defaults.withCredentials = true
// NProgress 配置
NProgress.configure({
  showSpinner: false
})
// http request拦截
service.interceptors.request.use(
  config => {
    NProgress.start()
    // 让每个请求携带token
    if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
    // headers中配置text请求
    if (config.text === true) {
      config.headers['Content-Type'] = 'text/plain'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http response 拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // 关闭 progress bar
    NProgress.done()
    if (response.config.downFile) {
      return response
    }

    // 获取状态码
    const status = response.status || res.ackCode
    const statusWhiteList = []
    const message = response.msg || response.data.msg || res.message || res.error_description || '请重新登录'
    // 如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res)
    // 如果是401则跳转到登录页面
    // if (status === 401) store.dispatch('FedLogOut').then(() => window.location.replace(this.VUE_APP_BASE_URL + '#/login'))
    if (status === 401) {
      MessageBox.confirm('您已被登出，请重新登录！', '确认登出', {
        confirmButtonText: '登出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          window.location.href = window.origin + '/' + (process.env.PRO_NAME ? process.env.PRO_NAME : '')
        }, 100)
        store.dispatch('user/FedLogOut')
      })
      return null
    }
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      Message({
        message: message,
        type: 'error'
      })
      // router.push({ path: '/login' })
      return Promise.reject(new Error(message))
    }
    if (res.ackCode && res.ackCode !== 200) {
      Message({
        message: message,
        type: 'warning'
      })
      // router.push({ path: '/login' })
      // return Promise.reject(new Error(message))
    }
    return res
  },
  error => {
    NProgress.done()
    return Promise.reject(new Error(error))
  }
)

export default service
