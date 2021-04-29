import request from '@/utils/request'
const Qs = require('qs')

export function loginApi(data) {
  return request({
    url: '/login',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function logoutApi() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
