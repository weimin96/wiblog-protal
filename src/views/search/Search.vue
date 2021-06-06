<template>
  <lazy-scroll-layout
    ref="scrollLayout"
    :page-num.sync="param.pageNum"
    @load="search"
  >
    <div v-for="item in list" :key="item.id">
      <div class="card" @click="gotoPage(item.url)">
        <div class="title">
          <a href="#">
            <span>{{ item.title }}</span>
          </a>
        </div>
        <div class="abstract">
          <span class="time">{{ item.createTime | dateFormat }} - </span>
          <span v-html="item.content" />
          <div class="category-tag">
            <a>{{ menuVal(item.categoryId) }}</a>
          </div>
        </div>
      </div>
    </div>
  </lazy-scroll-layout>
</template>

<script>
import { searchArticleApi } from '@/api/article'
import { getQueryVariable } from '@/utils/utils'
import { mapState } from 'vuex'
import LazyScrollLayout from '@c/LazyScrollLayout'

export default {
  name: 'Search',
  components: {
    LazyScrollLayout
  },
  data() {
    return {
      searchVal: '',
      list: [],
      param: {
        keyword: '',
        // 这里从0开始
        pageNum: -1,
        pageSize: 4
      }
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.menu
    }),
    menuVal: function() {
      return function(d) {
        const obj = this.menu.find(item => {
          return item.id === d
        })
        if (obj) {
          return obj.name
        }
        return ''
      }
    }
  },
  mounted() {
    this.$bus.on('search', this.searchNewPage)
  },
  methods: {
    searchNewPage(val) {
      this.searchVal = val
      if (!this.searchVal || this.searchVal.trim() === '') {
        return
      }
      this.param.keyword = val
      searchArticleApi(this.param).then(res => {
        if (res.code === 10000) {
          this.list = res.data
        }
      })
    },
    search() {
      if (this.searchVal === '') {
        this.searchVal = getQueryVariable('val')
        if (this.searchVal.trim() === '') {
          return
        }
      }
      this.param.keyword = this.searchVal
      searchArticleApi(this.param).then(res => {
        if (res.code === 10000) {
          if (res.data.length > 0) {
            this.list = this.list.concat(res.data)
          } else {
            this.$refs.scrollLayout.isEnd = true
          }
        }
        this.$refs.scrollLayout.isLoading = false
      })
    },
    gotoPage(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
    .card {
        background-color: #fff;
        border-radius: 5px;
        padding: 24px;
        border-bottom: 0;

        .title {
            line-height: 1.54;
            padding-bottom: 10px;
            font-weight: 400;
            font-size: medium;
            margin-bottom: 1px;
        }

        .abstract {
            font-size: 13px;
            .time {
                color: #333;
                font-style: italic;
            }
            /deep/ p {
                color: red;
                display: inline;
                font-weight: bold;
            }

            .category-tag {
                padding: 8px 0 0 0;

                a {
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
