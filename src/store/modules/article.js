import { getArticleRankApi } from '@/api/article'

const state = {
  articleRank: []
}

const getters = {
  getArticleRank: (state) => {
    return state.articleRank
  }
}

const mutations = {
  SET_ARTICLE_RANK: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  setArticleRank({ commit }) {
    return new Promise((resolve, reject) => {
      getArticleRankApi(null)
        .then(response => {
          const { data } = response
          commit('SET_ARTICLE_RANK', data)
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
