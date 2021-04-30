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
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'

export const getBaseUrl = () => {
  return Vue.prototype.VUE_APP_HOST
}

// create an axios instance
const service = axios.create({
  baseUrl: 'https://www.wiblog.cn/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 200000 // request timeout
})
service.interceptors.request.use(
  config => {
    // do something before request is sent
    NProgress.start()
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    if (config.baseURL === '') {
      config.baseURL = getBaseUrl()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    NProgress.done()
    // if the custom code is not 20000, it is judged as an error.
    if (res.ackCode !== 200) {
      Message({
        message: res.message || '服务器异常！',
        type: 'error',
        duration: 5 * 1000
      })

      // need login;
      if (res.ackCode === 401) {
        // to re-login
        setTimeout(() => {
          window.location.href = window.origin + '/login'
        }, 100)
      }
      return Promise.reject(new Error(res.message || '服务器异常！'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
