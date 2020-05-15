import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success,
      message,
      token
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signup($fullName: String!, $email: String!, $password: String!, $rePassword: String!) {
    signup(signupReq: {
      fullName: $fullName,
      email: $email,
      password: $password,
      rePassword: $rePassword
    }) {
      success,
      message,
      user {
        id
      }
    }
  }
`

export const NEW_USER_MUTATION = gql`
  mutation addUser ($fullName: String!, $email: String!, $role: String!, $password: String!) {
    addUser (addUserReq: {
      fullName: $fullName,
      email: $email,
      role: $role,
      password: $password
    }) {
      success,
      message,
      user {
        id
      }
    }
  }
`
