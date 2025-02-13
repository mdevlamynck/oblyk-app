<template>
  <div>
    <v-form @submit.prevent="submit()">

      <!-- Ascent status -->
      <ascent-status-input v-model="data.ascent_status" />

      <!-- Released at -->
      <date-picker-input
        v-model="data.released_at"
        icon="mdi-calendar"
        :label="$t('models.ascentGymRoute.released_at')"
      />

      <note-input
        v-model="data.note"
      />

      <v-textarea
        outlined
        v-model="data.comment"
        :label="$t('models.ascentGymRoute.comment')"
      />

      <!-- Sections choice -->
      <div
        v-if="gymRoute && gymRoute.sections.length > 1"
        class="mb-7"
      >
        <p class="subtitle-2">
          {{ $t('components.ascentGymRoute.pitchMade') }} :
        </p>
        <div
          v-for="(section, index) in gymRoute.sections"
          :key="`section-${index}`"
        >
          <v-checkbox
            v-model="data.selected_sections"
            :label="`L.${index + 1} - ${section.grade}`"
            :value="index"
            hide-details
          />
        </div>
      </div>

      <close-form />
      <submit-form
        :overlay="submitOverlay"
        :goBackBtn="false"
        :submit-local-key="submitText()"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { DateHelpers } from '@/mixins/DateHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import AscentGymRouteApi from '@/services/oblyk-api/AscentGymRouteApi'
import CloseForm from '@/components/forms/CloseForm'
import AscentStatusInput from '@/components/forms/AscentStatusInput'
import DatePickerInput from '@/components/forms/DatePickerInput'
import store from '@/store'
import NoteInput from '@/components/forms/NoteInput'

export default {
  name: 'AscentGymRouteForm',
  components: { NoteInput, DatePickerInput, AscentStatusInput, CloseForm, SubmitForm },
  mixins: [
    FormHelpers,
    DateHelpers
  ],
  props: {
    gymRoute: Object,
    ascentGymRoute: {
      type: Object,
      required: false
    },
    callback: Function,
    defaultAscentStatus: {
      type: String,
      default: 'sent'
    }
  },

  data () {
    return {
      data: {
        id: (this.ascentGymRoute || {}).id,
        ascent_status: (this.ascentGymRoute || {}).ascent_status || this.defaultAscentStatus,
        released_at: (this.ascentGymRoute || {}).released_at || this.today().format('YYYY-MM-DD'),
        selected_sections: (this.ascentGymRoute || {}).sections_done || this.gymRoute.sections.map((section, index) => index),
        gym_route_id: (this.ascentGymRoute || {}).gym_route_id || this.gymRoute.id,
        note: (this.ascentGymRoute || {}).note,
        comment: (this.ascentGymRoute || {}).comment
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? AscentGymRouteApi.update(this.data) : AscentGymRouteApi.create(this.data)

      promise
        .then(resp => {
          store.dispatch('auth/updateAscentGymRoutes', {
            ascent_gym_routes: resp.data
          })
          if (this.callback) {
            this.callback()
          } else {
            this.$router.push(this.gymRoute.path())
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'ascentGymRoute')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
