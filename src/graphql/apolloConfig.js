import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

const httpLinkAuth = setContext((_, { headers }) => {
  // get the authentication token from localstorage if it exists
  const token = localStorage.getItem('USER_TOKEN')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLinkAuth.concat(httpLink),
  cache: new InMemoryCache()
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
