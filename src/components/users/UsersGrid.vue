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
          <v-btn color="primary" dark @click.stop="dialog=true">New</v-btn>
          <new-user-form :visible="dialog" @close="dialog=false" :item="editedItem" :title="formTitle"/>
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
              <v-icon color="green" @click="editItem(item)">edit</v-icon>
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

export default {
  name: 'UsersGrid',
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
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
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
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.refresh()
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      this.refresh()
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
