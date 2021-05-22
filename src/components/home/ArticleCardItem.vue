<template>
  <div>
    <li class="note-flow">
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
        <i class="iconfont ic-icon_jewel" />
        <span>27.674</span>
        <span class="name">漫小文</span>
        <span>
          <i class="iconfont ic-list-comments"/>
          27
        </span>
        <span>
          <i class="iconfont ic-list-like" />
          147
        </span>
        <span class="note__flow__download">阅读全文</span>
      </div>
    </li>
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
    padding-right: 95px;
    margin-top: 6px;
    display: block;
    .wrap-img {
      position: absolute;
      top: 50%;
      right: 25px;
      margin-top: -50px;
      border-radius: 3px;
    }
    .summary {
      overflow: hidden;
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
    padding-right: 95px;
    margin-top: 15px;
    line-height: 22px;
    position: relative;
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
