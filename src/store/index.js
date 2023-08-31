import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    isLoggedIn: false,
    // 添加更多的状态...
  },
  mutations: {
    SET_IS_LOGGED_IN(state, value) {
      state.isLoggedIn = value
    },
    // 添加更多的突变...
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('/api/login', credentials)
      commit('SET_IS_LOGGED_IN', response.data.isLoggedIn)
    },
    // 添加更多的动作...
  },
  modules: {
    // 你的模块...
  }
})

export default store
