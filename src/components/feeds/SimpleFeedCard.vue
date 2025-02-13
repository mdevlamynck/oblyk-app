<template>
  <v-card
    elevation="0"
    class="feed-card"
    :to="!haveParent(feed.feedable_type) ? recordToObject(feed.feedable_type, feed.feed_object).path() : ''"
  >

    <!-- Feed card title -->
    <v-card-title
      class="feed-card-title"
      v-if="showTitleCard(feed.feedable_type)"
    >
      <v-icon left small v-text="headers[feed.feedable_type].icon" />

      <!-- No parent -->
      <span v-if="!haveParent(feed.feedable_type)">
        {{ $t(headers[feed.feedable_type].title, { name: feed.feed_object.name } ) }}
      </span>

      <!-- With parent -->
      <span v-if="haveParent(feed.feedable_type)">
        {{ $t(headers[feed.feedable_type].title ) }}
        <router-link :to="parentObject(feed.feedable_type, feed.feed_object).path()">
          {{ parentObject(feed.feedable_type, feed.feed_object).name }}
        </router-link>
      </span>
    </v-card-title>

    <!-- Feed card content -->
    <v-card-text
      class="pb-1"
      v-bind:class="showTitleCard(feed.feedable_type) ? '' : 'pt-1'"
    >
      <word-feed-card :word="recordToObject('Word', feed.feed_object)" v-if="feed.feedable_type === 'Word'" />
      <crag-feed-card :crag="recordToObject('Crag', feed.feed_object)" v-if="feed.feedable_type === 'Crag'" />
      <gym-feed-card :gym="recordToObject('Gym', feed.feed_object)" v-if="feed.feedable_type === 'Gym'" />
      <alert-feed-card :alert="recordToObject('Alert', feed.feed_object)" v-if="feed.feedable_type === 'Alert'" />
      <article-feed-card :article="recordToObject('Article', feed.feed_object)" v-if="feed.feedable_type === 'Article'" />

      <!-- Guide books -->
      <guide-book-paper-feed-card
        :guide-book-paper="recordToObject('GuideBookPaper', feed.feed_object)"
        v-if="feed.feedable_type === 'GuideBookPaper'"
      />
      <guide-book-pdf-feed-card
        :guide-book-pdf="recordToObject('GuideBookPdf', feed.feed_object)"
        v-if="feed.feedable_type === 'GuideBookPdf'"
      />
      <guide-book-web-feed-card
        :guide-book-web="recordToObject('GuideBookWeb', feed.feed_object)"
        v-if="feed.feedable_type === 'GuideBookWeb'"
      />

      <video-feed-card
        :video="recordToObject('Video', feed.feed_object)"
        v-if="feed.feedable_type === 'Video'"
      />
    </v-card-text>
    <v-card-subtitle>
      <feed-date-title :feed="feed" />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import WordFeedCard from '@/components/words/WordFeedCard'
import CragFeedCard from '@/components/crags/CragFeedCard'
import GymFeedCard from '@/components/gyms/GymFeedCard'
import AlertFeedCard from '@/components/alerts/AlertFeedCard'
import GuideBookPaperFeedCard from '@/components/guideBookPapers/GuideBookPaperFeedCard'
import GuideBookPdfFeedCard from '@/components/guideBookPdfs/GuideBookPdfFeedCard'
import GuideBookWebFeedCard from '@/components/guideBookWebs/GuideBookWebFeedCard'
import VideoFeedCard from '@/components/videos/VideoFeedCard'
import Crag from '@/models/Crag'
import CragRoute from '@/models/CragRoute'
import CragSector from '@/models/CragSector'
import ArticleFeedCard from '@/components/articles/ArticleFeedCard'
import FeedDateTitle from '@/components/feeds/FeedDateTitle'

export default {
  name: 'SimpleFeedCard',
  mixins: [RecordToObjectHelpers],
  components: {
    FeedDateTitle,
    ArticleFeedCard,
    VideoFeedCard,
    GuideBookWebFeedCard,
    GuideBookPdfFeedCard,
    GuideBookPaperFeedCard,
    AlertFeedCard,
    GymFeedCard,
    CragFeedCard,
    WordFeedCard
  },
  props: {
    feed: Object
  },

  data () {
    return {
      headers: {
        Word: { icon: 'mdi-book-open-variant', title: 'components.feed.newWord' },
        Crag: { icon: 'mdi-terrain', title: 'components.feed.newCrag' },
        GuideBookPaper: { icon: 'mdi-book-open-page-variant', title: 'components.feed.newGuideBookPaper' },
        GuideBookPdf: { icon: 'mdi-file-pdf-outline', title: 'components.feed.newGuideBookPdf' },
        GuideBookWeb: { icon: 'mdi-earth', title: 'components.feed.newGuideBookWeb' },
        Gym: { icon: 'mdi-home-roof', title: 'components.feed.newGym' },
        Video: { icon: 'mdi-film', title: 'components.feed.newVideo' },
        Alert: { icon: 'mdi-alert-box-outline', title: 'components.feed.newAlert' },
        Article: { icon: 'mdi-newspaper-variant-outline', title: 'components.feed.newArticle' }
      }
    }
  },

  methods: {
    showTitleCard: function (type) {
      return !['Article'].includes(type)
    },

    haveParent: function (type) {
      return ['GuideBookPdf', 'GuideBookWeb', 'Video', 'Alert', 'Photo'].includes(type)
    },

    parentObject: function (type, feedObject) {
      if (['GuideBookPdf', 'GuideBookWeb'].includes(type)) {
        return new Crag(feedObject.crag)
      }
      if (type === 'Video') {
        if (feedObject.viewable_type === 'Crag') {
          return new Crag(feedObject.viewable)
        } else if (feedObject.viewable_type === 'CragRoute') {
          return new CragRoute(feedObject.viewable)
        }
      }
      if (type === 'Alert') {
        if (feedObject.alertable_type === 'Crag') {
          return new Crag(feedObject.alertable)
        } else if (feedObject.alertable_type === 'CragRoute') {
          return new CragRoute(feedObject.alertable)
        } else if (feedObject.alertable_type === 'CragSector') {
          return new CragSector(feedObject.alertable)
        }
      }
    }
  }
}
</script>
