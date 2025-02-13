<template>
  <div>
    <div v-if="submitted">
      <v-alert
        type="success"
        class="mt-7"
        v-html="$t('components.gymAdministrationRequest.requestIsSent')"
      >
      </v-alert>
      <p class="text-center">
        <v-btn
          outlined
          color="primary"
          :to="gym.path()"
        >
          {{ $t('actions.backToName', { name: gym.name }) }}
        </v-btn>
      </p>
    </div>

    <spinner v-if="loadingCurrentUser" />

    <v-form
      class="mt-7"
      v-if="!submitted && !loadingCurrentUser"
      @submit.prevent="submit()"
    >
      <v-text-field
        outlined
        v-model="data.first_name"
        :label="$t('models.gymAdministratorRequest.first_name')"
        required
      />

      <v-text-field
        outlined
        v-model="data.last_name"
        :label="$t('models.gymAdministratorRequest.last_name')"
        required
      />

      <v-text-field
        outlined
        type="email"
        v-model="data.email"
        :label="$t('models.gymAdministratorRequest.email')"
        required
      />

      <v-textarea
        outlined
        v-model="data.justification"
        :label="$t('models.gymAdministratorRequest.justification')"
      />

      <close-form />
      <submit-form :overlay="submitOverlay" />
    </v-form>
  </div>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { SessionConcern } from '@/concerns/SessionConcern'
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import GymAdministratorRequestApi from '@/services/oblyk-api/GymAdministratorRequestApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GymAdministratorRequestForm',
  mixins: [FormHelpers, SessionConcern, CurrentUserConcern],
  components: { Spinner, CloseForm, SubmitForm },
  props: {
    gym: Object,
    method: String
  },

  created () {
    this.getCurrentUser()
  },

  watch: {
    currentUser: function () {
      if (this.currentUser) {
        this.data.first_name = this.currentUser.first_name
        this.data.last_name = this.currentUser.last_name
        this.data.email = this.currentUser.email
      }
    }
  },

  data () {
    return {
      submitted: false,
      loadingCurrentUser: true,
      data: {
        last_name: null,
        first_name: null,
        justification: null,
        email: null,
        gym_id: this.gym.id
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true

      GymAdministratorRequestApi
        .create(this.data)
        .then(() => {
          this.submitted = true
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministratorRequest')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
