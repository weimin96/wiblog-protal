<template>
  <div id="app">
    <Header />
    <router-view :key="this.$route.path" />
    <Footer />
  </div>
</template>

<style lang="scss">

</style>
<script>
import Header from '@c/Header'
import Footer from '@c/Footer'
export default {
  components: { Footer, Header }
}
</script>
