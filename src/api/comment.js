import request from '@/utils/request'
const Qs = require('qs')

const url = '/comment'

// 获取评论列表
export function commentListPageApi(data) {
  return request({
    url: url + '/commentListPage',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 回复评论/文章
export function replyApi(data) {
  return request({
    url: url + '/reply',
    method: 'post',
    data: Qs.stringify(data)
  })
}

