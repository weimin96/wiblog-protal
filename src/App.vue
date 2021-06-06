<template>
  <div id="app">
    <router-view :key="this.$route.path" />
  </div>
</template>

<style lang="scss">
  #app{
    overflow: hidden;
    height: 100%;

  }
</style>
<script>
export default {
}
</script>
