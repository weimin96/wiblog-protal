<template>
  <div id="app">
    <Header />
    <router-view />
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
