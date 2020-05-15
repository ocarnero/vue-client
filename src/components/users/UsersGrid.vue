<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex xs12 sm6 md7 lg8>
        <div class="pb-10">
          <h1>Users</h1>
          <h3>Users CRUD</h3>
        </div>
        <v-row
          align="center"
          justify="end"
          class="pb-7 pr-10"
        >
          <v-btn color="primary" @click.stop="onNewClick">New</v-btn>
        </v-row>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.fullname }}</td>
              <td>{{ props.item.email }}</td>
              <td>{{ props.item.role }}</td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon color="green" @click="onUpdateClick(item)">edit</v-icon>
              <v-icon color="red" @click="deleteItem(item)">delete</v-icon>
            </template>
            <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
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
  // components: {
  //   // eslint-disable-next-line vue/no-unused-components
  //   NewUpdateUser
  // },
  data: () => ({
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
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
    isNew () {
      return this.editedIndex === -1
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    ...mapActions({
      getAllUsers: 'user/getAll'
    }),
    initialize () {
      this.getAllUsers()
    },
    refresh () {
      this.getAllUsers()
    },
    onNewClick () {
      this.$dialog.show(NewUpdateUser)
    },
    async onUpdateClick (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      var updatePopUp = await this.$dialog.show(NewUpdateUser)
      if (updatePopUp) {
        this.refresh()
      }
    },
    async deleteItem (item) {
      const index = this.items.indexOf(item)
      const user = this.items[index]
      const res = await this.$dialog.warning({
        text: `Do you really want to delete the user ${user.fullName}?`,
        title: 'Warning'
      })
      if (res === undefined) {
      } else {
        this.refresh()
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }//,
    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.items[this.editedIndex], this.editedItem)
    //   } else {
    //     this.items.push(this.editedItem)
    //   }
    //   this.close()
    // }
  }
}
</script>
