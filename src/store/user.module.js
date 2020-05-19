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
        const formatedError = errorHandlerAndFormater(error)
        dispatch('alert/error', formatedError, { root: true })
      })
  },
  getAllRoles ({ dispatch, commit }) {
    return userService
      .getAllRoles()
      .then((resp) => {
        commit('getAllRolesSuccess', resp.data.roles)
      })
      .catch(error => {
        const formatedError = errorHandlerAndFormater(error)
        dispatch('alert/error', formatedError, { root: true })
      })
  },
  createUser ({ dispatch, commit }, user) {
    return userService
      .createUser(user)
      .then((resp) => {
        if (resp.data.addUser.success) {
          commit('saveUserSuccess', resp.data.addUser.user)
          return resp.data.addUser.user
        } else {
          const formatedError = errorHandlerAndFormater(resp.data.addUser.message)
          dispatch('alert/error', formatedError, { root: true })
        }
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
        if (resp.data.editUser) {
          commit('editUserSuccess', resp.data.editUser)
          return resp.data.editUser
        }
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
