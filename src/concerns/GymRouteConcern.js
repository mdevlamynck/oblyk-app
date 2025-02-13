import GymRoute from '@/models/GymRoute'

export const GymRouteConcern = {
  data () {
    return {
      gymRoute: null,
      loadingGymRoute: true
    }
  },

  created () {
    if (
      this.$route.params.gymId &&
      this.$route.params.gymSpaceId &&
      this.$route.params.gymRouteId
    ) {
      this.getGymRoute()
    }
  },

  methods: {
    getGymRoute: function () {
      this.loadingGymRoute = true
      new GymRoute()
        .find(
          this.$route.params.gymId,
          this.$route.params.gymSpaceId,
          this.$route.params.gymRouteId
        )
        .then((resp) => {
          this.gymRoute = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        }).finally(() => {
          this.loadingGymRoute = false
        })
    }
  }
}
