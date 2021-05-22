<template>
  <div class="home">
    <div v-for="item in articleList" :key="item.id">
      <article-card-item :data="item"/>
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
    console.log(moment.months())
    articlesApi().then((res) => {
      this.articleList = res.data.records
    })
  }
}
</script>

<style type="scss" scoped>

</style>
