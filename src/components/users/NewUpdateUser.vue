<template>
  <DialogCard :title="formTitle" persistent eager>
    <v-card>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field v-model="item.fullName" label="Full Name" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="item.email" label="Email" :rules="emailRules" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-select
                  :items="roles"
                  label="Role"
                  solo
                  v-model="item.role"
                  required
                ></v-select>
              </v-flex>
              <v-flex v-if="!isNew">
                <v-text-field v-model="item.createdAt" label="Created" disabled>{{ item.createdAt | moment('MMMM Do YYYY, h:mm') }}</v-text-field>
              </v-flex>
              <v-flex v-if="isNew">
                <v-text-field v-model="item.password" label="Password" type="password"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="btnClose" >
          <v-icon left>cancel</v-icon>
          Cancel
        </v-btn>
        <v-btn color="primary" @click="btnSave" >
          <v-icon left>save</v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </DialogCard>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NewUpdateUser',
  data: () => ({
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    item: {
      fullName: null,
      email: null,
      role: null,
      password: null
    },
    form: null
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
    this.form = this.$refs.form
  },
  methods: {
    ...mapActions('user', ['getAllRoles', 'createUser', 'editUser']),
    initialize () {
      this.getAllRoles()
    },
    btnClose () {
      this.$emit('submit', false)
    },
    async btnSave () {
      const isValid = this.$refs.form.validate()
      if (isValid) {
        let action
        if (this.isNew) {
          action = this.createUser(this.item)
        } else {
          action = this.editUser(this.item)
        }
        await action
          .then(resp => {
            if (resp) {
              this.$emit('submit', true)
            }
          })
      }
    }
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    }),
    formTitle () {
      return this.isNew ? 'New User' : 'Edit User'
    }
  }
}
</script>
