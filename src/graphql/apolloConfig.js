import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import router from '../router'

const graphLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

const httpLinkAuth = setContext((_, { headers }) => {
  // get the authentication token from localstorage if it exists
  const token = localStorage.getItem('USER_TOKEN')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors[0].extensions.code === 'FORBIDDEN') {
    router.replace('/login')
  }
  let msgs = null

  if (networkError) {
    msgs = `[Network error]: ${networkError}`
  }

  if (graphQLErrors) {
    msgs += msgs ? ' - ' : ''
    msgs += '[GraphQL error]: '
    let count = 0
    graphQLErrors.forEach(({ message, locations, path }) => {
      // msgs += `Message ${count}: ${message}, Location: ${locations}, Path: ${path}`
      msgs += `Message ${count}: ${message}; `
      count++
    })
  }
  console.log(msgs)
})

const link = ApolloLink.from([httpLinkAuth, errorLink, graphLink])

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
