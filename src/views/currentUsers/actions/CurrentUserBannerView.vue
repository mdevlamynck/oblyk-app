<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <v-container v-if="!loadingCurrentUser">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.changeBanner') }}
          </h2>
          <user-image-form
            :user="currentUser"
            upload-type="banner"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserImageForm from '@/components/users/forms/UserImageForm'

export default {
  name: 'CurrentUserBannerView',
  components: { UserImageForm, Spinner },
  mixins: [CurrentUserConcern],

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.banner')
    }
  }
}
</script>
