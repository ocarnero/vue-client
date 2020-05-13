<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app>
    <!-- -->
    <v-icon @click.stop="mini = !mini" :class="'px-2'">menu</v-icon>
    <v-toolbar-title>Starter-kit app</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    mini: Boolean
  },
  data () {
    return {
    }
  }
}
</script>
