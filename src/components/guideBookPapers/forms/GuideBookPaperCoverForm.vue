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
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import axios from 'axios'

export default {
  name: 'GuideBookPaperCoverForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers, AppConcern, SessionConcern],

  props: {
    guideBookPaper: Object
  },

  data () {
    return {
      file: null,
      uploadPercentage: 0
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()

      formData.append('guide_book_paper[cover]', this.file)

      axios({
        method: 'POST',
        url: `${this.baseUrl}/public/guide_book_papers/${this.guideBookPaper.id}/add_cover.json`,
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
        .then(() => {
          this.$router.push(this.guideBookPaper.path())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'guide_book_paper')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
