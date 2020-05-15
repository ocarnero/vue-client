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
export const NEW_USER_MUTATION = gql`
  mutation addUser($fullName: String!, $email: String!, $role: String!) {
    addUser(fullName: $fullName, email: $email, role: $role) {
      success,
      message,
      user
    }
  }
`
