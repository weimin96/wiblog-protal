<template>
  <lazy-scroll-layout
    ref="scrollLayout"
    :page-num.sync="param.pageNum"
    @load="getArticle"
  >
    <div class="home">
      <div class="flow-list-container">
        <div v-for="item in articleList" :key="item.id">
          <div class="flow-list-ul">
            <article-card-item :data="item" />
          </div>
        </div>
      </div>
    </div>
  </lazy-scroll-layout>
</template>

<script>
import { articlesApi } from '@/api/article'
import { getCategoryIdByUrlApi } from '@/api/category'
import ArticleCardItem from '@c/home/ArticleCardItem'
import LazyScrollLayout from '@c/LazyScrollLayout'

export default {
  name: 'Category',
  components: {
    LazyScrollLayout,
    ArticleCardItem
  },
  data() {
    return {
      articleList: [],
      param: {
        pageNum: 0,
        pageSize: 4,
        categoryId: null
      }
    }
  },
  methods: {
    getCategoryIdByUrl() {
      let url = this.$route.path
      url = url.substring(url.lastIndexOf('/') + 1)
      return getCategoryIdByUrlApi({ url: url }).then(res => {
        if (res.code === 10000) {
          this.param.categoryId = res.data
          return res.data
        }
        return null
      })
    },
    async getArticle() {
      if (this.param.categoryId === null) {
        this.param.categoryId = await this.getCategoryIdByUrl()
      }
      articlesApi(this.param).then((res) => {
        if (res.code === 10000) {
          if (res.data.records.length > 0) {
            this.articleList = this.articleList.concat(res.data.records)
          }
          this.$refs.scrollLayout.pages = res.data.pages
        }
        this.$refs.scrollLayout.isLoading = false
      })
    }
  }
}
</script>

<style type="scss" scoped>
  .home{
    padding: 0 18px;
    .flow-list-container{
      position: relative;
      width: 100%;
      height: 100%;
      background-color: transparent;
      .flow-list-ul {
        position: relative;
        min-height: 100%;
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
        list-style-type: none;
      }
    }
  }

</style>
