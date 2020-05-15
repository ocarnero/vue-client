<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
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
                :items="Roles"
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" @click.stop="show=false">Cancel</v-btn>
        <v-btn color="teal darken-1" @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'newUser',
  data: () => ({
  }),
  props: {
    visible: { type: Boolean },
    isNew: { type: Boolean },
    title: { type: String },
    item: { type: Object }
  },
  created () {
    this.getAllRoles()
  },
  methods: {
    ...mapActions({
      getAllRoles: 'user/getAllRoles',
      createUser: 'user/createUser'
    }),
    save () {
      if (this.isNew) {
        this.createUser(this.item)
      }
    }
  },
  computed: {
    ...mapState({
      Roles: state => state.user.roles
    }),
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>
