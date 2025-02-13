<template>
  <v-form
    @submit.prevent="submit()"
    enctype="multipart/form-data"
  >
    <v-file-input
      v-model="file"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
    />

    <close-form />
    <submit-form
      :overlay="overlay"
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>
<script>
import { AppConcern } from '@/concerns/AppConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import Gym from '@/models/Gym'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import axios from 'axios'

export default {
  name: 'GymImageForm',
  components: { CloseForm, SubmitForm },
  mixins: [AppConcern, SessionConcern],
  props: {
    gym: {
      type: Object,
      required: false
    },
    uploadType: String
  },

  data () {
    return {
      uploadPercentage: 0,
      overlay: false,
      file: null
    }
  },

  methods: {
    submit: function () {
      this.overlay = true
      const formData = new FormData()
      let url

      if (this.uploadType === 'logo') {
        formData.append('gym[logo]', this.file)
        url = `${this.baseUrl}/gyms/${this.gym.id}/add_logo.json`
      } else {
        formData.append('gym[banner]', this.file)
        url = `${this.baseUrl}/gyms/${this.gym.id}/add_banner.json`
      }

      axios({
        method: 'POST',
        url: url,
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
          const gym = new Gym(resp.data)
          this.$router.push(gym.path())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
        }).then(() => {
          this.overlay = false
        })
    }
  }
}
</script>
