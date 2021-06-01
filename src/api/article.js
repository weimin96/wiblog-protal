import request from '@/utils/request'
const Qs = require('qs')

const url = '/post'

// 文章列表
export function articlesApi(data) {
  return request({
    url: url + '/articles',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 文章详情
export function getArticleApi(data) {
  return request({
    url: url + '/getArticle?' + Qs.stringify(data),
    method: 'get'
  })
}

// 点赞文章
export function likeApi(data) {
  return request({
    url: url + '/record/like',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 点击文章
export function hitApi(data) {
  return request({
    url: url + '/record/hit',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 搜索文章
export function searchArticleApi(data) {
  return request({
    url: url + '/searchArticle?' + Qs.stringify(data),
    method: 'get'
  })
}

// 热门文章
export function getArticleRankApi() {
  return request({
    url: url + '/getArticleRank',
    method: 'get'
  })
}
