<template>
  <div>
    <div
      v-for="crag in crags"
      :key="crag.id"
      class="guide-book-paper-crags-list"
    >
      <div class="guide-book-paper-crag-card">
        <crag-small-card :crag="crag" class="mb-3"/>
      </div>
      <div class="guide-book-paper-crag-action text-center">
        <v-btn
          v-if="isLoggedIn"
          :title="$t('components.guideBookPaper.removeFromGuideBook')"
          icon
          @click="removeCrag(crag)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div v-if="isLoggedIn" class="mt-3">
      <v-btn
        text
        :to="guideBookPaper.path('add-crag')"
        color="primary"
      >
        <v-icon
          left
        >
          mdi-terrain
        </v-icon>
        {{ $t('components.guideBookPaper.addCragInGuide') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import CragSmallCard from '@/components/crags/CragSmallCard'
import { SessionConcern } from '@/concerns/SessionConcern'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'

export default {
  name: 'GuideBookPaperCrags',
  components: { CragSmallCard },
  mixins: [SessionConcern],
  props: {
    crags: Array,
    guideBookPaper: Object
  },

  methods: {
    removeCrag: function (crag) {
      if (confirm(this.$t('actions.areYouSur'))) {
        GuideBookPaperApi
          .removeCrag(this.guideBookPaper.id, crag.id)
          .then(() => {
            this.$router.go()
          })
          .catch(err => {
            this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.guide-book-paper-crags-list {
  .guide-book-paper-crag-card, .guide-book-paper-crag-action {
    display: inline-block;
  }
  .guide-book-paper-crag-card {
    width: calc(100% - 100px);
  }
  .guide-book-paper-crag-action {
    width: 90px;
    height: 100px;
    vertical-align: top;
    line-height: 80px;
  }
}
</style>
