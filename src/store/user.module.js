import { userService } from '../services/user.service'

const state = {
  users: [],
  roles: []
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
  },
  getAllRoles ({ dispatch, commit }) {
    userService
      .getAllRoles()
      .then((resp) =>
        commit('getAllRolesSuccess', resp.data.roles)
      )
      .catch(error => {
        dispatch('alert/error', error, { root: true })
      })
  },
  createUser ({ dispatch, commit }, user) {
    userService
      .saveUser(user)
      .then((resp) =>
        commit('saveUserSuccess', resp.data.roles)
      )
      .catch(error => {
        dispatch('alert/error', error, { root: true })
      })
  },
  editUser ({ dispatch, commit }, user) {
    userService
      .editUser(user)
      .then((resp) =>
        commit('editUserSuccess', resp.data.user)
      )
      .catch(error => {
        dispatch('alert/error', error.message, { root: true })
      })
  }
}

const mutations = {
  getAllSuccess (state, users) {
    state.users = users
  },
  getAllRolesSuccess (state, roles) {
    state.roles = roles
  },
  saveUserSuccess (state) {
  },
  editUserSuccess (state) {
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
