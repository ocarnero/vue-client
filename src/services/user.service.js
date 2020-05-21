import { USER_TOKEN } from '../constants/app'
import { LOGIN_MUTATION, NEW_USER_MUTATION, SIGNUP_MUTATION, EDIT_USER_MUTATION, DELETE_USER_MUTATION } from '../graphql/mutations'
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
      }
    })
}

const signup = (signupRequest) => {
  return apolloClient
    .mutate({
      mutation: SIGNUP_MUTATION,
      variables: signupRequest
    })
}

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem(USER_TOKEN)
}

const getAll = () => {
  return apolloClient
    .query({
      query: USERS_QUERY
    })
}

const getAllRoles = () => {
  return apolloClient
    .query({
      query: ROLES_QUERY
    })
}

const createUser = (user) => {
  return apolloClient
    .mutate({
      mutation: NEW_USER_MUTATION,
      variables: user
    })
}

const editUser = (user) => {
  return apolloClient
    .mutate({
      mutation: EDIT_USER_MUTATION,
      variables: user,
      refetchQueries: ['users']
    })
}

const deleteUser = (user) => {
  return apolloClient
    .mutate({
      mutation: DELETE_USER_MUTATION,
      variables: user
    })
}

export const userService = {
  login,
  signup,
  logout,
  getAll,
  getAllRoles,
  createUser,
  editUser,
  deleteUser
}
