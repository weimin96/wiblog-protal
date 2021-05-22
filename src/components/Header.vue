<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        wiblog
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <div v-for="item in menu" :key="item.id">
            <b-nav-item-dropdown v-if="item.children">
              <template v-slot:button-content>
                {{ item.name }}
              </template>
              <b-dropdown-item v-for="it in item.children" :key="it.id" :href="it.url">
                {{ it.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-else :href="item.url">
              {{ item.name }}
            </b-nav-item>
          </div>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="" />
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              搜索
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.menuTree
    })
  }
}
</script>

<style scoped>

</style>
