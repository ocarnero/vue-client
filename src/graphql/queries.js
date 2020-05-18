import gql from 'graphql-tag'

export const USERS_QUERY = gql`
  query {
    users {
      _id
      fullName
      email
      role
      createdAt
    }
  }
`
export const ROLES_QUERY = gql`
  query {
    roles
  }
`
