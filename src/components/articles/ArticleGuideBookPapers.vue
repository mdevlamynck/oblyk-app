<template>
  <div v-if="guideBookPapers.length > 0">
    <h2 class="loved-by-king mb-2 mt-8">
      <v-icon left>mdi-book-open-variant</v-icon>
      {{ $t('components.article.guideBookPaperList') }}
    </h2>
    <guide-book-paper-small-card
      class="mb-2"
      v-for="guideBookPaper in guideBookPapers"
      :key="guideBookPaper.id"
      :guide-book-paper="guideBookPaper"
    />
  </div>
</template>

<script>
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import GuideBookPaper from '@/models/GuideBookPaper'

export default {
  name: 'ArticleGuideBookPapers',
  components: { GuideBookPaperSmallCard },
  props: {
    article: Object
  },

  data () {
    return {
      guideBookPapers: []
    }
  },

  mounted () {
    this.getArticleCrags()
  },

  methods: {
    getArticleCrags: function () {
      ArticleApi
        .guideBookPapers(this.article.id)
        .then(resp => {
          for (const guideBookPaper of resp.data) {
            this.guideBookPapers.push(new GuideBookPaper(guideBookPaper))
          }
        })
    }
  }
}
</script>
