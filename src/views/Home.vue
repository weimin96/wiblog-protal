<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@c/HelloWorld'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    console.log(moment.months())
  }
}
</script>

<style type="less" scoped>

</style>
