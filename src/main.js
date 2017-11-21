// Apollo imports
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat, split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import router from './router'

import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import { GC_AUTH_TOKEN, GC_API_URL, GC_WSS_URL } from '../.secrets'

const httpLink = new HttpLink({ uri: GC_API_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem(GC_AUTH_TOKEN) || null
    }
  })
  return forward(operation)
})

// Set up subscription
const wsLink = new WebSocketLink({
  uri: GC_WSS_URL,
  options: {
    reconnect: true
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)
Vue.use(VueMaterial)

Vue.config.productionTip = false

Vue.filter('truncate', function (value, length) {
  let suffix = ''
  if (!value) return ''
  if (!length > 0) length = 20
  if (value.length > length) suffix = '...'
  return value.substring(0, length) + suffix
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  },
  errorHandler (error) {
    console.log('Global error handler')
    console.error(error)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  router,
  template: '<App/>',
  components: { App }
})
