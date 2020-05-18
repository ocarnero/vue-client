import './registerServiceWorker'
import 'vuetify-dialog/dist/vuetify-dialog.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import apolloProvider from './graphql/apolloConfig'
import VueApollo from 'vue-apollo'
import VuetifyDialog from 'vuetify-dialog'

Vue.use(VuetifyDialog, {
  context: {
    vuetify,
    store
  }
})

Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
