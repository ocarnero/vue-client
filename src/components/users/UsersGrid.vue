<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex xs12 sm6 md7 lg8>
        <div class="pb-5">
          <h1>Users</h1>
        </div>
        <v-row
          align="center"
          justify="end"
          class="pb-5 pr-5"
        >
          <v-btn color="primary" @click.stop="onNewClick">New</v-btn>
          <v-btn color="primary" @click="initialize">Refresh</v-btn>
        </v-row>
        <v-card-title>
          Users
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            class="elevation-1"
          >
          <template v-slot:item.createdAt="{ item }">
            <td>{{ item.createdAt | moment("MMMM Do YYYY, h:mm") }}</td>
          </template>
            <template v-slot:item.actions="{ item }">
              <v-icon color="green" @click="onUpdateClick(item)">edit</v-icon>
              <v-icon color="red" @click="deleteItem(item)">delete</v-icon>
            </template>
            <template slot="no-data">
              <div>No data</div>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NewUpdateUser from './NewUpdateUser.vue'

export default {
  name: 'UsersGrid',
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      { text: 'Full Name', value: 'fullName', sortable: true },
      { text: 'Email', value: 'email', sortable: true },
      { text: 'Role', value: 'role', sortable: true },
      { text: 'Created', value: 'createdAt', sortable: true },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      fullName: '',
      email: '',
      role: '',
      createdAt: ''
    }
  }),
  computed: {
    ...mapState({
      items: state => state.user.users
    })
  },
  created () {
    this.initialize()
  },
  methods: {
    ...mapActions({
      getAllUsers: 'user/getAll',
      deleteUser: 'user/deleteUser'
    }),
    initialize () {
      this.getAllUsers()
    },
    refresh () {
      setTimeout(() => {
        this.getAllUsers()
      }, 1000)
    },
    onNewClick () {
      this.$dialog.show(NewUpdateUser, { isNew: true, waitForResult: true })
        .then((resp) => {
          if (resp) {
            this.$store.dispatch('alert/success', 'User created success.')
            this.refresh()
          }
        })
    },
    async onUpdateClick (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$dialog.show(NewUpdateUser, { itemToEdit: this.editedItem, isNew: false, waitForResult: true })
        .then((resp) => {
          if (resp) {
            this.$store.dispatch('alert/success', 'User updated success.')
            this.refresh()
          }
        })
    },
    async deleteItem (item) {
      const res = await this.$dialog.warning({
        text: `Do you really want to delete the user ${item.fullName}?`,
        title: 'Warning'
      })
      if (res) {
        this.deleteUser(item)
          .then(() => {
            this.$store.dispatch('alert/success', 'User deleted success.')
            this.refresh()
          })
      }
    }
  }
}
</script>
