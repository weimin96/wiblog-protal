<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" @click="gotoUrl('/')">
        wiblog
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-form>
          <b-form-input v-model="searchVal" size="sm" class="mr-sm-2" placeholder="" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="search">
            搜索
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <div v-for="item in menu" :key="item.id">
            <b-nav-item-dropdown v-if="item.children">
              <template v-slot:button-content>
                {{ item.name }}
              </template>
              <b-dropdown-item v-for="it in item.children" :key="it.id" @click="gotoUrl('/category/' + it.url)">
                {{ it.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-else @click="gotoUrl('/category/' + item.url)">
              {{ item.name }}
            </b-nav-item>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getQueryVariable } from '@/utils/utils'

export default {
  name: 'Header',
  data() {
    return {
      searchVal: ''
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.menuTree
    })
  },
  mounted() {
    this.searchVal = getQueryVariable('val')
  },
  methods: {
    gotoUrl(url) {
      this.$router.push(url)
    },
    search() {
      this.$router.push({ path: '/search', query: { val: this.searchVal }})
      this.$bus.emit('search', this.searchVal)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-control{
    width: 9rem;
  }
  .navbar-brand{
    margin-right: 0.5rem;
  }
</style>
