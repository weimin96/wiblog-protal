import Vue from 'vue'
import Vuex from 'vuex'
import menu from '@/store/modules/menu'
import article from '@/store/modules/article'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
    article
  }
})
