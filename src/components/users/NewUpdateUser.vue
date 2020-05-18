<template>
  <DialogCard title="Login" :actions="actions" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field v-model="item.fullName" label="Full Name"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="item.email" label="Email"></v-text-field>
            </v-flex>
            <v-flex>
              <v-select
                :items="roles"
                label="Role"
                solo
                v-model="item.role"
              ></v-select>
            </v-flex>
            <v-flex v-if="!isNew">
              <v-text-field v-model="item.createdAt" label="Created" disabled></v-text-field>
            </v-flex>
            <v-flex v-if="isNew">
              <v-text-field v-model="item.password" label="Password" type="password"></v-text-field>
            </v-flex>
          </v-layout>
          <!-- <v-layout>
            <v-flex>
              <v-text-field
                v-model="editedItem.content"
                :counter="500"
                :rules="[(v) => v.length <= 500 || 'Max 500 characters']"
                label="Content"
                multi-line
              >
              </v-text-field>
            </v-flex>
          </v-layout> -->
        </v-container>
      </v-card-text>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" @click.stop="closeClick">Cancel</v-btn>
        <v-btn color="teal darken-1" @click.stop="save">Save</v-btn>
      </v-card-actions> -->
    </v-card>
  </DialogCard>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NewUpdateUser',
  data: () => ({
    item: {
      fullName: '',
      email: '',
      role: ''
    }
  }),
  props: {
    visible: { type: Boolean },
    isNew: { type: Boolean },
    itemToEdit: { type: Object }
  },
  created () {
    this.initialize()
    if (!this.isNew) {
      this.item = this.itemToEdit
    }
  },
  methods: {
    ...mapActions('user', ['getAllRoles', 'createUser', 'editUser']),
    initialize () {
      this.getAllRoles()
    }
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    }),
    formTitle () {
      return this.isNew ? 'New User' : 'Edit User'
    },
    actions () {
      return [
        {
          text: 'Cancel',
          color: 'teal darken-1',
          handle: () => {
            this.$emit('submit', false)
          }
        },
        {
          text: 'Save',
          color: 'teal darken-1',
          handle: () => {
            let action
            if (this.isNew) {
              action = this.createUser(this.item)
            } else {
              action = this.editUser(this.item)
            }
            return action
          }
        }]
    }
  }
}
</script>
