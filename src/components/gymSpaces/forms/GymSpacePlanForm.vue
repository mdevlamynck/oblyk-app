<template>
  <v-form
    @submit.prevent="submit()"
    enctype="multipart/form-data"
  >
    <v-file-input
      v-model="plan"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
    ></v-file-input>

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import GymSpace from '@/models/GymSpace'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import axios from 'axios'

export default {
  name: 'GymSpacePlanForm',
  mixins: [FormHelpers, AppConcern, SessionConcern],
  components: { CloseForm, SubmitForm },
  props: {
    gymSpace: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      plan: null,
      uploadPercentage: 0
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()
      formData.append('gym_space[plan]', this.plan)

      axios({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.gymSpace.gym.id}/gym_spaces/${this.gymSpace.id}/add_plan.json`,
        headers: {
          Authorization: this.getToken,
          HttpApiAccessToken: this.apiAccessToken,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        },
        data: formData
      })
        .then((resp) => {
          const gymSpace = new GymSpace(resp.data)
          this.$router.push(gymSpace.path())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
