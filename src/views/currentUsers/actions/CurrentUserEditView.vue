<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.globalInformation') }}
        </h2>
        <user-form :user="user" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserForm from '@/components/users/forms/UserForm'

export default {
  name: 'CurrentUserEditView',
  components: { UserForm },
  props: {
    user: Object
  },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.edit')
    }
  }
}
</script>
