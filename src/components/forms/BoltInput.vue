<template>
  <v-select
    v-model="bolt"
    :items="bolts"
    item-text="text"
    item-value="value"
    :hide-details="hideDetails"
    prepend-inner-icon="mdi-nut"
    :label="$t('components.input.boltType')"
    outlined
    v-disabled-icon-focus
    :tabindex="tabindex"
    :dense="dense"
    ref="boltInput"
    clearable
    @focus="onFocus"
    @change="onChange"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'BoltInput',
  mixins: [InputHelpers],
  props: {
    value: String,
    dense: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    tabindex: Number
  },

  data () {
    return {
      bolts: [
        { text: this.$t('models.boltType.forged_eye_bolts'), value: 'forged_eye_bolts' },
        { text: this.$t('models.boltType.bolt_hangers'), value: 'bolt_hangers' },
        { text: this.$t('models.boltType.open_staple_bolts'), value: 'open_staple_bolts' },
        { text: this.$t('models.boltType.staple_u_bolts'), value: 'staple_u_bolts' },
        { text: this.$t('models.boltType.no_bolts'), value: 'no_bolts' }
      ],
      bolt: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.bolt)
    },

    onFocus: function () {
      this.$refs.boltInput.isMenuActive = true
    }
  }
}
</script>
