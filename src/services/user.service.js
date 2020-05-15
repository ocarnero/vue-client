import { USER_TOKEN } from '../constants/app'
import { LOGIN_MUTATION, NEW_USER_MUTATION } from '../graphql/mutations'
import { USERS_QUERY, ROLES_QUERY } from '../graphql/queries'
import { apolloClient } from '../graphql/apolloConfig'

const login = (email, password) => {
  return apolloClient
    .mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: email,
        password: password
      }
    })
    .then(response => {
      // save user token to localstorage
      if (response.data.login.success && response.data.login.token) {
        localStorage.setItem(USER_TOKEN, response.data.login.token)
      } else if (!response.data.login.success) {
        throw (response.data.login.message)
      }
    })
}

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem(USER_TOKEN)
}

const getAll = (email, password) => {
  return apolloClient
    .query({
      query: USERS_QUERY
    })
}

const getAllRoles = (email, password) => {
  return apolloClient
    .query({
      query: ROLES_QUERY
    })
}

const saveUser = (user) => {
  return apolloClient
    .mutate({
      mutation: NEW_USER_MUTATION,
      variables: user
    })
}

export const userService = {
  login,
  logout,
  getAll,
  getAllRoles,
  saveUser
}
