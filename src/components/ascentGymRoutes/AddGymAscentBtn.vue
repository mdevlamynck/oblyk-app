<template>
  <v-dialog
    v-model="ascentModal"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="primary"
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          mdi-check
        </v-icon>
        <span v-if="isRepetition">
          {{ $t('actions.addRepetition') }}
        </span>
        <span v-else>
          {{ $t('actions.addInMyLogbook') }}
        </span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('components.ascentGymRoute.new', { name: gymRoute.name }) }}
      </v-card-title>
      <v-card-text>
        <ascent-gym-route-form
          :gym-route="gymRoute"
          submit-methode="post"
          :callback="successCallback"
          :default-ascent-status="isRepetition ? 'repetition' : 'sent'"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AscentGymRouteForm from '@/components/ascentGymRoutes/forms/AscentGymRouteForm'

export default {
  name: 'AddGymAscentBtn',
  components: { AscentGymRouteForm },
  props: {
    gymRoute: Object,
    isRepetition: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      ascentModal: false
    }
  },

  methods: {
    successCallback: function () {
      this.$root.$emit('reloadAscentGymRoute')
      this.ascentModal = false
    }
  }
}
</script>
