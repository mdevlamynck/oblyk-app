<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-newspaper-variant-multiple
      </v-icon>
      {{ $t('components.guideBookPaper.relatedArticles') }}
    </v-card-title>
    <v-card-text>
      <spinner v-if="loadingArticles" :full-height="false" />
      <div v-if="!loadingArticles">
        <article-feed-card
          v-for="article in articles"
          :key="article.id"
          :article="article"
          class="mb-2"
          :show-footer="false"
          :show-read-more="true"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import Spinner from '@/components/layouts/Spiner'
import { SessionConcern } from '@/concerns/SessionConcern'
import Article from '@/models/Article'
import ArticleFeedCard from '@/components/articles/ArticleFeedCard'

export default {
  name: 'GuideBookPaperArticles',
  components: { ArticleFeedCard, Spinner },
  mixins: [SessionConcern],
  props: {
    guideBookPaper: Object
  },

  data () {
    return {
      loadingArticles: true,
      articles: []
    }
  },

  mounted () {
    this.getArticles()
  },

  methods: {
    getArticles: function () {
      this.loadingArticles = true
      GuideBookPaperApi
        .articles(this.guideBookPaper.id)
        .then(resp => {
          this.articles = []
          for (const article of resp.data) {
            this.articles.push(new Article(article))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'articles')
        })
        .finally(() => {
          this.loadingArticles = false
        })
    }
  }
}
</script>
