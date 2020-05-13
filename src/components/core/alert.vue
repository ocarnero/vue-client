<template>
    <v-snackbar
      v-if="alert.message"
      v-model="snackbar"
      :color=color
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{alert.message}}
      <v-btn
        dark
        text
        @click="snackbar = false"
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
      mode: '',
      snackbar: true,
      timeout: 6000,
      x: null,
      y: 'bottom'
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
    })
  },
  watch: {
    $route (to, from) {
      // clear alert on location change
      this.clearAlert()
    }
  }
}
</script>
