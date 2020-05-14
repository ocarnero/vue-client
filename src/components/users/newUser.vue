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
              <v-text-field v-model="item.role" label="Role"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field v-model="item.createdAt" label="Created"></v-text-field>
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
export default {
  name: 'newUser',
  props: {
    visible: { type: Boolean },
    title: { type: String },
    item: {
      type: Object
    }
  },
  computed: {
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
