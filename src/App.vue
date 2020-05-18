<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant="mini"
      :permanent="true"
      app>
      <!-- -->
      <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="'px-0'">
            <v-list-item-avatar>
              <img src="https://avatars0.githubusercontent.com/u/24800098?s=60&amp;v=4">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app>
      <!-- -->
      <v-icon @click.stop="mini = !mini" :class="'pr-10'">menu</v-icon>
      <img class="mr-3" :src="require('./assets/logo.png')" height="25" :class="'pr-2'"/>
      <v-toolbar-title>Starter-kit app</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from './components/core/footer'

export default {
  components: {
    Footer
  },
  computed: {
    errorMsg () {
      return this.$store.state.alert.message
    }
  },
  watch: {
    errorMsg (newValue, oldValue) {
      if (newValue) {
        this.$dialog.message.error(newValue, {
          position: 'bottom-right',
          timeout: 0
        })
        this.$store.dispatch('alert/error', null, { root: true })
      }
    }
  },
  data () {
    return {
      drawer: true,
      mini: true,
      items: [
        { title: 'Home', icon: 'home', link: '/' },
        { title: 'Login', icon: 'account_box', link: '/login' },
        { title: 'About', icon: 'mode_comment', link: '/about' },
        { title: 'Users Admin', icon: 'account_box', link: '/users' },
        { title: 'Logout', icon: 'exit_to_app', link: '/logout' }
      ]
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
