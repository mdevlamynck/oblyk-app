<template>
  <small :title="humanizeDate(feed.posted_at, 'LLL')">
    {{ this.$t('common.posted') }}
    {{ feedDateFromNow(feed.posted_at) }}
  </small>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'FeedDateTitle',
  mixins: [DateHelpers],
  props: {
    feed: Object
  }
}
</script>
