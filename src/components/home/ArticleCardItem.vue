<template>
  <article class="post-card">
    <div class="post-list-pic">
      <a :href="data.articleUrl"><img :src="data.imgUrl" alt=""></a>
    </div>
    <div class="post-list-inner">
      <header class="post-list-inner-header">
        <a class="label" :href="'/category/'+data.categoryUrl">{{ data.categoryName }}
          <i class="label-arrow" />
        </a>
        <h2 class="post-list-inner-title">
          <a :href="data.articleUrl">{{ data.title }}</a>
        </h2>
      </header>
      <div class="post-list-inner-content">
        <p>{{ data.articleSummary }}</p>
      </div>
    </div>
    <div class="post-list-meta">
      <span class="visible-lg visible-md visible-sm pull-left">
        <a :href="data.articleUrl"><i class="fa fa-calendar" />{{ data.createTime | dateFormat }}</a>
        <a :href="data.articleUrl+'#respond'"><i class="fa fa-commenting-o" />{{ data.commentsCounts }} 条评论</a>
      </span>
      <span class="pull-left">
        <a :href="data.articleUrl"><i class="fa fa-eye" />{{ data.hits }} 次阅读</a>
        <a :href="data.articleUrl"><i class="fa fa-thumbs-o-up" />{{ data.likes }} 人点赞</a>
      </span>
      <span class="pull-right">
        <a class="read-more" :href="data.articleUrl" title="阅读全文">阅读全文+
          <i class="fa fa-chevron-circle-right" /></a>
      </span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ArticleCardItem',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-card {
  margin: 0 0 15px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
  border-radius: 0;

  .fa:before {
    margin-right: 5px;
  }
}
</style>
