import { getCategoryApi } from '@/api/category'

const state = {
  menu: [],
  menuTree: []
}

const getters = {
  getMenu: (state, getters) => {
    return state.menu
  },
  getMenuTree: (state, getters) => {
    return state.menuTree
  }
}

const buildTree = function(parentId, data) {
  const result = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === parentId) {
      result.push(data[i])
      data[i].children = buildTree(data[i].id, data)
    }
  }
  if (result.length > 0) {
    return result
  }
  return null
}

const mutations = {
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_MENU_TREE: (state, menu) => {
    state.menuTree = buildTree(0, menu)
    return state.menuTree
  }
}

const actions = {
  setMenu({ commit }) {
    return new Promise((resolve, reject) => {
      getCategoryApi(null)
        .then(response => {
          const { data } = response
          commit('SET_MENU', data)
          commit('SET_MENU_TREE', data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
