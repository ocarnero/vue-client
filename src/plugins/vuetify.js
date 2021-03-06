import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  iconfont: 'md'
})

const opts = {
  theme: {
    dark: true
  }
}

export default new Vuetify(opts)
