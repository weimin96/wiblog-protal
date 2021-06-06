<template>
  <div class="page-component__scroll el-scrollbar">
    <div class="el-scrollbar__wrap">
      <div class="el-scrollbar__view">
        <Header />
        <div
          v-infinite-scroll="load"
          infinite-scroll-disabled="stop"
          infinite-scroll-distance="50"
        >
          <slot />
          <div v-if="num === pages || isEnd" class="wrapper">
            <span class="line" />
            <span class="content">我是有底线的</span>
            <span class="line" />
          </div>
        </div>
        <Footer />
        <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="50" :right="20">
          <div
            style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                border-radius: 33%;
                color: rgb(87 112 136);;
              }"
          >
            <i class="el-icon-caret-top" />
          </div>
        </el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@c/Header'
import Footer from '@c/Footer'

export default {
  name: 'LazyScrollLayout',
  components: {
    Header,
    Footer
  },
  props: {
    pageNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isLoading: false,
      pages: 1,
      isEnd: false
    }
  },
  computed: {
    num: {
      get() {
        return this.pageNum
      },
      set(val) {
        this.$emit('update:pageNum', val)
      }
    },
    stop() {
      return this.isLoading || this.pageNum >= this.pages || this.isEnd
    }
  },
  methods: {
    load() {
      this.isLoading = true
      this.num++
      this.$emit('load')
    }
  }
}
</script>

<style lang="scss" scoped>
    .page-component__scroll {
        height: 100%;

        .el-scrollbar__wrap {
            overflow-x: auto;
          .wrapper {
            text-align: center;
            margin-bottom: 9px;
            .line {
              width: 20%;
              display: inline-block;
              border: 0.4px solid #ddd;
              vertical-align: middle;
            }
            .content {
              color: #ccc;
              font-size: 14px;
            }
          }
        }
    }
</style>
