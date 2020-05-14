import { userService } from '../services/user.service'

const state = {
  users: []
}

const actions = {
  getAll ({ dispatch, commit }) {
    userService
      .getAll()
      .then((resp) =>
        commit('getAllSuccess', resp.data.users)
      )
      .catch(error => {
        dispatch('alert/error', error, { root: true })
      })
  }
}

const mutations = {
  getAllSuccess (state, users) {
    state.users = users
  }
}

export const user = {
  namespaced: true,
  state,
  actions,
  mutations
}
