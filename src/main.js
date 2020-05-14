import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import apolloProvider from './graphql/apolloConfig'
import VueApollo from 'vue-apollo'
import NewUserForm from './components/users/newUser'

Vue.use(VueApollo)
Vue.component('new-user-form', NewUserForm)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
