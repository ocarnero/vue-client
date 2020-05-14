<template>
  <v-content>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="login-form text-xs-center">
        <div class="display-1 mb-3">
          <v-icon class="mr-2" large="large">account_circle</v-icon> {{options.isLoggingIn ? 'Login' : 'SignUp'}}
        </div>
        <v-card color="green darken-5">
          <v-card-text>
            <div class="subheading">
              <template v-if="options.isLoggingIn">Log in</template>
              <template v-else="">New account</template>
            </div>
            <v-form>
              <v-text-field v-if="!options.isLoggingIn" v-model="user.name" prepend-icon="person" label="Name"></v-text-field>
              <v-text-field v-model="user.email" prepend-icon="email" label="Email" type="email"></v-text-field>
              <v-text-field v-model="user.password" prepend-icon="lock" label="Password" type="password"></v-text-field>
              <v-checkbox v-model="options.shouldStayLoggedIn" label="Stay logged in?" :value="options.shouldStayLoggedIn"></v-checkbox>
              <v-checkbox
                v-model="checkbox"
                :label="`Checkbox 1: ${checkbox.toString()}`"
              ></v-checkbox>
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
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  computed: {
    ...mapState({
      logedIn: state => state.loggedIn
    })
  },
  data () {
    return {
      checkbox: true,
      showResult: false,
      result: null,
      error: false,
      user: {
        email: 'test@test.com',
        password: '123',
        name: ''
      },
      options: {
        isLoggingIn: true,
        shouldStayLoggedIn: null
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
