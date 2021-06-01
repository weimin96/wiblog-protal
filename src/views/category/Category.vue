<template>
  <div class="home">
    <div class="flow-list-container">
      <div v-for="item in articleList" :key="item.id" class="flow-list-ul">
        <article-card-item :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { articlesApi } from '@/api/article'
import { getCategoryIdByUrlApi } from '@/api/category'
import ArticleCardItem from '@c/home/ArticleCardItem'

export default {
  name: 'Category',
  components: {
    ArticleCardItem
  },
  data() {
    return {
      articleList: [],
      page: {
        pageNum: 1,
        pageSize: 5,
        categoryId: ''
      },
      isLoading: false,
      scrollEvent: null
    }
  },
  mounted() {
    this.scroll()
    this.init()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, false)
  },
  methods: {
    async init() {
      this.articleList = []
      const categoryId = await this.getCategoryIdByUrl()
      if (categoryId !== null) {
        this.getArticle()
      }
    },
    getCategoryIdByUrl() {
      let url = this.$route.path
      url = url.substring(url.lastIndexOf('/') + 1)
      return getCategoryIdByUrlApi({ url: url }).then(res => {
        if (res.code === 10000) {
          this.page.categoryId = res.data
          return res.data
        }
        return null
      })
    },
    getArticle() {
      articlesApi(this.page).then((res) => {
        if (res.code === 10000) {
          if (res.data.records.length > 0) {
            this.articleList = this.articleList.concat(res.data.records)
            this.isLoading = false
          } else {
            window.removeEventListener('scroll', this.scrollEvent, false)
          }
        }
      })
    },
    scroll() {
      this.isLoading = false
      this.scrollEvent = window.onscroll = () => {
        // 距离底部200px时加载一次
        const bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 300
        if (bottomOfWindow && !this.isLoading) {
          this.isLoading = true
          this.page.pageNum++
          this.getArticle()
        }
      }
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
