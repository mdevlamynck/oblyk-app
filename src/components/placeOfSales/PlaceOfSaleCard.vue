<template>
  <div class="place-of-sale-card">
    <p class="font-weight-bold mb-0">
      {{ placeOfSale.name }}
    </p>
    <p v-if="placeOfSale.url" class="mb-0">
      <v-icon left small>
        mdi-link
      </v-icon>
      <a :href="placeOfSale.url">{{ placeOfSale.url }}</a>
    </p>
    <p v-if="placeOfSale.description" class="mb-0">
      <v-icon left small>
        mdi-format-align-justify
      </v-icon>
      {{ placeOfSale.description }}
    </p>
    <p v-if="placeOfSale.city || placeOfSale.address || placeOfSale.postal_code">
      <v-icon left small>
        mdi-map-marker
      </v-icon>
      {{ placeOfSale.address }}, {{ placeOfSale.postal_code }} {{ placeOfSale.city }}, {{ placeOfSale.country }}
    </p>
    <owner-label
      :owner="placeOfSale.creator"
      :history="placeOfSale.history"
      :edit-path="`/guide-book-papers/${placeOfSale.guide_book_paper_id}/guide/place-of-sales/${placeOfSale.id}/edit?redirect_to=${$route.fullPath}`"
      :delete-function="deletePlaceOfSale"
      :reports="{ type: 'PlaceOfSale', id: placeOfSale.id }"
    />
  </div>
</template>

<script>
import OwnerLabel from '@/components/users/OwnerLabel'
import PlaceOfSaleApi from '@/services/oblyk-api/PlaceOfSaleApi'

export default {
  name: 'PlaceOfSaleCard',
  components: { OwnerLabel },
  props: {
    placeOfSale: Object,
    getPlaceOfSales: Function
  },

  methods: {
    deletePlaceOfSale: function () {
      if (confirm(this.$t('actions.areYouSur'))) {
        PlaceOfSaleApi
          .delete(
            this.placeOfSale.guide_book_paper_id,
            this.placeOfSale.id
          )
          .then(() => {
            this.getPlaceOfSales()
          })
          .catch(err => {
            this.$root.$emit('alertFromApiError', err, 'placeOfSale')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.place-of-sale-card {
  border-radius: 5px;
  padding: 10px;
}

.theme--light {
  .place-of-sale-card {
    background-color: #f5f5f5;
  }
}

.theme--dark {
  .place-of-sale-card {
    background-color: #121212;
  }
}
</style>
