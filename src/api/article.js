import request from '@/utils/request'
const Qs = require('qs')

const url = '/post'

export function articlesApi(data) {
  return request({
    url: url + '/articles',
    method: 'post',
    data: Qs.stringify(data)
  })
}
