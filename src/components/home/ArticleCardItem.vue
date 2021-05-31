<template>
  <div>
    <div class="note-flow" @click="gotoArticle">
      <div class="content">
        <span class="wrap-img inline-3MDdF_0" style="width: 80px; height: 80px;">
          <img :src="data.imgUrl">
        </span>
        <div class="summary">
          <h6 class="title">
            {{ data.title }}
          </h6>
          <p class="abstract">
            {{ data.articleSummary }} ...
          </p>
        </div>
      </div>
      <div class="meta oneline">
        <i class="iconfont icon-rili" />
        <span>{{ data.createTime | dateFormat }}</span>
        <span>
          <i class="iconfont icon-pinglun" />
          {{ data.commentsCounts }}
        </span>
        <span>
          <i class="iconfont icon-yanjing" />
          {{ data.hits }}
        </span>
        <span>
          <i class="iconfont icon-dianzan" />
          {{ data.likes }}
        </span>
        <span class="note__flow__download">阅读全文</span>
      </div>
    </div>
  </div>
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
  },
  methods: {
    gotoArticle() {
      this.$router.push(this.data.articleUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.note-flow {
  position: relative;
  width: 100%;
  word-wrap: break-word;
  padding: 15px 18px;
  margin: 0 -18px;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  border-bottom: 1px solid;
  font-size: 0;
  border-color: #f0f0f0;
  &:before {
    content: "";
    clear: both;
    display: table;
  }
  .content {
    padding-right: 90px;
    margin-top: 6px;
    display: block;
    .wrap-img {
      position: absolute;
      top: 50%;
      right: 12px;
      margin-top: -50px;
      border-radius: 3px;
    }
    .summary {
      overflow: hidden;
      text-align: left;
      .title {
        font-size: 18px;
        font-weight: 700;
        color: #333;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 25px;
        max-height: 50px;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        white-space: normal;
      }
      .abstract {
        margin-top: 6px;
        font-size: 13px;
        line-height: 1.5;
        height: 38px;
        color: #999;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 19px;
        max-height: 38px;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        white-space: normal;
      }
    }
  }
  .meta {
    /*padding-right: 90px;*/
    margin-top: 15px;
    line-height: 22px;
    position: relative;
    text-align: left;
    span {
      margin-right: 8px;
      font-size: 12px;
      color: #b1b1b1;
    }
  }
  .oneline {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.inline-3MDdF_0 {
  position: relative;
  background-color: transparent;
  -webkit-transition: .4s linear;
  -o-transition: .4s linear;
  transition: .4s linear;
  overflow: hidden;
  display: inline-block;
}
</style>
