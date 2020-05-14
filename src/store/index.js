import Vue from 'vue'
import Vuex from 'vuex'
import { account } from './account.module'
import { alert } from './alert.module'
import { user } from './user.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    alert,
    user
  }
})
