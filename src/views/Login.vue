<template>
  <v-content>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="login-form text-xs-center">
        <div class="display-1 mb-3">
          <v-icon class="mr-2" large="large">work</v-icon> MyWorkspace
        </div>
        <v-card light="light">
          <v-card-text>
            <div class="subheading">
              <template v-if="options.isLoggingIn">Log in</template>
              <template v-else="">New account</template>
            </div>
            <v-form>
              <v-text-field v-if="!options.isLoggingIn" v-model="user.name" prepend-icon="person" label="Name"></v-text-field>
              <v-text-field v-model="user.email" prepend-icon="email" label="Email" type="email"></v-text-field>
              <v-text-field v-model="user.password" prepend-icon="lock" label="Password" type="password"></v-text-field>
              <v-checkbox v-if="options.isLoggingIn" v-model="options.shouldStayLoggedIn" label="Stay logged in?"></v-checkbox>
              <v-btn v-if="options.isLoggingIn" @click.prevent="loginButtonClick" block="block" type="submit">Sign in</v-btn>
              <v-btn v-else="" block="block" type="submit">Sign up</v-btn>
            </v-form>
          </v-card-text>
          <div v-if="options.isLoggingIn" class="padding">Don't have an account?
            <v-btn @click="options.isLoggingIn = false">Sign up</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-snackbar
    v-model="showResult"
    :timeout="2000"
    top>
    {{ result }}
  </v-snackbar>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  computed: {
    ...mapState('account', ['status'])
  },
  data () {
    return {
      showResult: false,
      result: null,
      error: false,
      user: {
        email: 'test@test.com',
        password: '123',
        name: 'John Doe'
      },
      options: {
        isLoggingIn: true,
        shouldStayLoggedIn: true
      }
    }
  },
  methods: {
    ...mapActions('account', ['login']),
    loginButtonClick: function () {
      const vm = this
      if (!vm.user.email || !vm.user.password) {
        vm.result = "Email and Password can't be null."
        vm.showResult = true
        return
      }

      this.login({ ...vm.user })
    }
  }
}
</script>

<style lang="less">
.login-form {
  max-width: 600px;
}
.padding {
  padding-bottom: 10px;
}
</style>
