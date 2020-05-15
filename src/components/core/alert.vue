<template>
    <v-snackbar
      v-if="alert.message"
      v-model="snackbar"
      :color=color
      @close="close"
    >
      {{alert.message}}
      <v-btn
        dark
        text
        @click="close"
      >
        X
      </v-btn>
    </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'alert',
  data () {
    return {
      color: 'error',
      snackbar: true,
      timeout: 0 // keep it open undefinitly
    }
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear'
    }),
    close () {
      this.clearAlert()
    }
  },
  watch: {
    $route (to, from) {
      // clear alert on location change
      this.clearAlert()
    }
  }
}
</script>
