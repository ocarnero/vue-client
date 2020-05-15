import { USER_TOKEN } from '../constants/app'
import { userService } from '../services/user.service'
import router from '../router/index'

// const user = JSON.parse(localStorage.getItem(USER_TOKEN))
const user = localStorage.getItem(USER_TOKEN)
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

const actions = {
  login ({ dispatch, commit }, { email, password }) {
    commit('loginRequest', { email })
    userService
      .login(email, password)
      .then(() =>
        // router.push(router.query.redirect || '/')
        router.replace('/')
      )
      .catch(error => {
        commit('loginFailure', error)
        dispatch('alert/error', error, { root: true })
      })
  },
  signup ({ dispatch, commit }, signupReq) {
    commit('registerRequest', signupReq)
    userService
      .signup(signupReq)
      .then(() =>
        // router.push(router.query.redirect || '/')
        router.replace('/login')
      )
      .catch(error => {
        commit('registerFailure', error)
        dispatch('alert/error', error, { root: true })
      })
  },
  logout ({ commit }) {
    commit('logout')
    userService
      .logout()

    router.replace('/')
  }
}

const mutations = {
  loginRequest (state, user) {
    state.status = { loggingIn: false }
    state.user = user
  },
  loginSuccess (state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginFailure (state) {
    state.status = { loggedIn: false }
    state.user = null
  },
  logout (state) {
    state.status = {}
    state.user = null
  },
  registerRequest (state, user) {
    state.status = { registering: true }
  },
  registerSuccess (state, user) {
    state.status = {}
  },
  registerFailure (state, error) {
    state.status = {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
