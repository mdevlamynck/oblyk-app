<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.word.name')"
    />

    <markdown-input
      v-model="data.definition"
      :label="$t('models.word.definition')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import WordApi from '@/services/oblyk-api/WordApi'
import CloseForm from '@/components/forms/CloseForm'
import Word from '@/models/Word'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'WordForm',
  components: { MarkdownInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    word: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      data: {
        id: (this.word || {}).id,
        name: (this.word || {}).name,
        definition: (this.word || {}).definition
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? WordApi.update(this.data) : WordApi.create(this.data)

      promise
        .then((resp) => {
          const word = new Word(resp.data)
          this.$router.push(word.path())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'word')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
