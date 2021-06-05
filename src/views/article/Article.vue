<template>
  <div class="container">
    <div class="main" v-occupy="{ data: content, config }">
      <div>
        <div class="article-header">
          <h2 class="title" v-occupy="{ data: article.title, config }">
            {{ article.title }}
          </h2>
        </div>
        <div class="top-meta">
          <div class="postMetaInline-avatar">
            <a>
              <img :src="authorImg" alt="" height="32" width="32" class="avatar" onerror="this.src = 'https://wiblog-1251822424.cos.ap-guangzhou.myqcloud.com/20210531150120-avatar.svg'"></a>
          </div>
          <div class="postMetaInline-feedSummary">
            <span class="cute">
              <a>{{ article.author }}</a></span>
            <span class="postMetaInline--supplemental">{{ article.createTime | dateFormat }}</span>
          </div>
        </div>
        <div class="article-content" v-html="content" />
        <div v-for="item in tagList" :key="item" class="post-tags">
          <a rel="tag">{{ item }}</a>
        </div>
        <div>
          收藏 点赞 评论
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleApi } from '@/api/article'
import { infoApi } from '@/api/user'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night.css'
import '@/style/article.scss'

export default {
  name: 'Article',
  data() {
    return {
      article: {},
      content: '',
      authorImg: '',
      tagList: [],
      config: {
        width: '200px',
        height: '18px',
        background: '#ddd'
      }
    }
  },
  created() {
    moment()
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    this.init()
  },
  mounted() {
  },
  methods: {
    async init() {
      const uid = await this.getArticle()
      if (uid !== null) {
        this.getAuthor(uid)
      }
    },
    getArticle() {
      const url = this.$route.path
      return getArticleApi({ url: url }).then(res => {
        if (res.code === 10000) {
          this.article = res.data
          this.content = marked(this.article.content)
          this.tagList = res.data.tags.slice().split(/[\n\s+,，]/g)
          return res.data.uid
        }
        return null
      })
    },
    getAuthor(uid) {
      infoApi({ id: uid }).then(res => {
        if (res.code === 10000) {
          this.authorImg = res.data.avatarImg
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 30px 0 0;
    .main{
      padding: 0 15px 0 15px;
      .article-header{
        padding-bottom: 10px;
        display: block;
        .title{
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
          margin: 0;
        }
      }
      .top-meta{
        font-size: 12px;
        line-height: 1.4;
        padding-bottom: 10px;
        color: rgba(0,0,0,.44);
        background-color: #fff;
        .postMetaInline-avatar{
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
          img{
            border-radius: 100%;
            margin-top: 5px;
          }
        }
        .postMetaInline-feedSummary{
          display: inline-block;
          vertical-align: middle;
          .cute{
            color: #3889c2;
          }
          .postMetaInline--supplemental{
            display: block;
          }
        }
      }
      .post-tags{
        padding: 15px 0;
        a{
          display: inline-block;
          border-radius: 3px;
          background-color: #f2f5fb;
          padding: 2px 8px;
          margin-right: 10px;
          font-size: 12px;
          color: #999;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
