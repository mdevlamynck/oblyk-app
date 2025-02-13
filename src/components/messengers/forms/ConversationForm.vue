<template>
  <v-form @submit.prevent="submit()">
    <user-search-form
      v-model="query"
      class="mb-4"
      :callback="addUser"
      :linkableResult="false"
    >
      <div class="mt-2">
        <v-chip
          v-for="(user, index) in selectedUsers"
          :key="`user-${index}`"
          close
          @click:close="removeUser(user)"
          class="mr-1"
        >
          {{ user.first_name }}
        </v-chip>
      </div>
    </user-search-form>

    <submit-form
      class="absolute-bottom-submit-message"
      v-if="selectedUsers.length > 0"
      :go-back-btn="false"
      :overlay="submitOverlay"
      submit-local-key="actions.writeMessage"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { SessionConcern } from '@/concerns/SessionConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import UserSearchForm from '@/components/users/forms/UserSearchForm'
import ConversationApi from '@/services/oblyk-api/ConversationApi'

export default {
  name: 'ConversationForm',
  components: { UserSearchForm, SubmitForm },
  mixins: [FormHelpers, SessionConcern],

  data () {
    return {
      query: null,
      selectedUsers: []
    }
  },

  methods: {
    addUser: function (user) {
      this.query = null

      if (this.loggedInUser.id === user.id) return
      for (const selectedUser of this.selectedUsers) {
        if (user.id === selectedUser.id) return
      }
      this.selectedUsers.push(user)
    },

    removeUser: function (user) {
      const users = []
      for (const selectedUser of this.selectedUsers) {
        if (selectedUser.id !== user.id) {
          users.push(selectedUser)
        }
      }
      this.selectedUsers = users
    },

    submit: function () {
      if (this.selectedUsers.length === 0) return
      this.submitOverlay = true

      const userData = {
        conversation_users_attributes: [
          {
            id: null,
            user_id: this.loggedInUser.id
          }
        ]
      }

      for (const selectedUser of this.selectedUsers) {
        userData.conversation_users_attributes.push({
          id: null,
          user_id: selectedUser.id
        })
      }

      ConversationApi
        .create(userData)
        .then(resp => {
          this.$router.push(
            this.loggedInUserUserPath(`messenger/${resp.data.id}`)
          )
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.absolute-bottom-submit-message {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
