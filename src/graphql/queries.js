import gql from 'graphql-tag'

export const USERS_QUERY = gql`
query {
  users{
    fullName
    email
    role
    createdAt
  }
}
`
