<template>
  <scroll-layout
    ref="scrollLayout"
    :page-num.sync="page.pageNum"
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
  </scroll-layout>
</template>

<script>
import { articlesApi } from '@/api/article'
import ArticleCardItem from '@c/home/ArticleCardItem'
import ScrollLayout from '@c/ScrollLayout'

export default {
  name: 'Index',
  components: {
    ScrollLayout,
    ArticleCardItem
  },
  data() {
    return {
      articleList: [],
      page: {
        pageNum: 0,
        pageSize: 5
      }
    }
  },
  methods: {
    getArticle() {
      articlesApi(this.page).then((res) => {
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
