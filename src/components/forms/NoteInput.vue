<template>
  <v-select
    v-model="note"
    :items="notes"
    item-text="text"
    item-value="value"
    prepend-inner-icon="mdi-star"
    :label="$t('components.input.note')"
    outlined
    clearable
    v-disabled-icon-focus
    ref="noteInput"
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'NoteInput',
  mixins: [InputHelpers],
  props: {
    value: [String, Number]
  },

  data () {
    return {
      notes: [
        { text: this.$t('models.note.terrible'), value: 0 },
        { text: this.$t('models.note.ugly'), value: 1 },
        { text: this.$t('models.note.not_outstanding'), value: 2 },
        { text: this.$t('models.note.decent'), value: 3 },
        { text: this.$t('models.note.nice'), value: 4 },
        { text: this.$t('models.note.very_nice'), value: 5 },
        { text: this.$t('models.note.classic'), value: 6 }
      ],
      note: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.note)
    },

    onFocus: function () {
      this.$refs.noteInput.isMenuActive = true
    }
  }
}
</script>
