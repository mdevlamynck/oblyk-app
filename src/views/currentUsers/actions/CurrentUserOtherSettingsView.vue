<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.otherSetting') }}
        </h2>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('components.user.actionOnMyAccount') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <delete-user-form :user="user" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeleteUserForm from '@/components/users/forms/DeleteUserForm'
export default {
  name: 'CurrentUserOtherSettingsView',
  components: { DeleteUserForm },
  props: {
    user: Object
  },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.otherSetting')
    }
  }
}
</script>
