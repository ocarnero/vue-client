import { userService } from '../services/user.service'
import { errorHandlerAndFormater } from '../utils/errorHandling'

const state = {
  users: [],
  roles: []
}

const getters = {

}

const actions = {
  getAll ({ dispatch, commit }) {
    return userService
      .getAll()
      .then((resp) => {
        commit('getAllSuccess', resp.data.users)
      })
      .catch(error => {
        dispatch('alert/error', error, { root: true })
      })
  },
  getAllRoles ({ dispatch, commit }) {
    return userService
      .getAllRoles()
      .then((resp) => {
        commit('getAllRolesSuccess', resp.data.roles)
      })
      .catch(error => {
        dispatch('alert/error', error, { root: true })
      })
  },
  createUser ({ dispatch, commit }, user) {
    return userService
      .createUser(user)
      .then((resp) => {
        commit('saveUserSuccess', resp.data.saveUser)
      })
      .catch(error => {
        const formatedError = errorHandlerAndFormater(error)
        dispatch('alert/error', formatedError, { root: true })
        throw formatedError
      })
  },
  editUser ({ dispatch, commit }, user) {
    return userService
      .editUser(user)
      .then((resp) => {
        commit('editUserSuccess', resp.data.editUser)
      })
      .catch(error => {
        const formatedError = errorHandlerAndFormater(error)
        dispatch('alert/error', formatedError, { root: true })
        throw formatedError
      })
  },
  deleteUser ({ dispatch, commit }, user) {
    return userService
      .deleteUser(user)
      .then((resp) => {
        commit('deleteSuccess', resp.data.deleteUser)
      })
      .catch(error => {
        const formatedError = errorHandlerAndFormater(error)
        dispatch('alert/error', formatedError, { root: true })
        throw formatedError
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
  },
  deleteSuccess (state) {
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
