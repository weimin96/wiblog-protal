<template>
  <div class="home">
    <div class="flow-list-container">
      <div v-for="item in articleList" :key="item.id" class="flow-list-ul">
        <article-card-item :data="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import { articlesApi } from '@/api/article'
import ArticleCardItem from '@c/home/ArticleCardItem'

export default {
  name: 'Home',
  components: {
    ArticleCardItem
  },
  data() {
    return {
      articleList: []
    }
  },
  mounted() {
    articlesApi().then((res) => {
      this.articleList = res.data.records
    })
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
