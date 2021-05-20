<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld'
import { articlesApi } from '@/api/article'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    console.log(moment.months())
    articlesApi().then((res) => {
      console.log(res)
    })
  }
}
</script>

<style type="scss" scoped>

</style>
