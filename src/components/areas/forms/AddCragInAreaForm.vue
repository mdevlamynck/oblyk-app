<template>
  <div>
    <crag-search-form
      :linkable-result="false"
      :callback="addCrag"
    />
    <close-form />
    <overlay-form :overlay="submitOverlay" />
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CragSearchForm from '@/components/crags/forms/CragSearchForm'
import CloseForm from '@/components/forms/CloseForm'
import OverlayForm from '@/components/forms/OverlayForm'
import AreaApi from '@/services/oblyk-api/AreaApi'

export default {
  name: 'AddCragInAreaForm',
  components: { OverlayForm, CloseForm, CragSearchForm },
  mixins: [FormHelpers],

  props: {
    area: Object
  },

  methods: {
    addCrag: function (crag) {
      this.submitOverlay = true

      AreaApi
        .addCrag(this.area.id, crag.id)
        .then(() => {
          this.$router.push(this.area.path('crags'))
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'area')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
