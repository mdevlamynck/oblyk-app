<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-newspaper-variant-multiple
      </v-icon>
      {{ $t('components.crag.relatedArticles') }}
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
import { SessionConcern } from '@/concerns/SessionConcern'
import Spinner from '@/components/layouts/Spiner'
import CragApi from '@/services/oblyk-api/CragApi'
import Article from '@/models/Article'
import ArticleFeedCard from '@/components/articles/ArticleFeedCard'

export default {
  name: 'CragArticles',
  components: { ArticleFeedCard, Spinner },
  mixins: [SessionConcern],
  props: {
    crag: Object
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
      CragApi
        .articles(this.crag.id)
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
