import request from '@/utils/request'
const Qs = require('qs')

const url = '/category'

// 获取导航
export function getCategoryApi(data) {
  return request({
    url: url + '/getCategory',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取分类id
export function getCategoryIdByUrlApi(data) {
  return request({
    url: url + '/getCategoryIdByUrl',
    method: 'post',
    data: Qs.stringify(data)
  })
}

