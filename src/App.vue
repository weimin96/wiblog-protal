<template>
  <div id="app">
    <div class="page-component__scroll el-scrollbar">
      <div class="el-scrollbar__wrap">
        <div class="el-scrollbar__view">
          <Header />
          <router-view :key="this.$route.path" />
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
  </div>
</template>

<style lang="scss">
  #app{
    overflow: hidden;
    height: 100%;
    .page-component__scroll{
      height: 100%;
      .el-scrollbar__wrap{
        overflow-x: auto;
      }
    }
  }
</style>
<script>
import Header from '@c/Header'
import Footer from '@c/Footer'
export default {
  components: { Footer, Header }
}
</script>
