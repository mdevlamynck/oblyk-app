<template>
  <v-card
    :link="presentation"
    :to="presentation ? word.path() : null"
    :flat="flat"
  >
    <v-card-title
      v-bind:class="small ? 'pb-0' : ''"
    >
      {{ word.name }}
    </v-card-title>
    <v-card-text
      v-bind:class="small ? 'pb-0' : ''"
    >
      <markdown-text :text="word.definition" />
    </v-card-text>
    <v-card-text v-if="!presentation">
      <contributions-label
        :versions-count="word.versions_count"
        :version-id="word.id"
        version-type="word"
      />
    </v-card-text>
    <v-card-actions
      v-if="!presentation && isLoggedIn"
    >
      <v-spacer />
      <v-btn
        :to="word.path('edit')"
        right
        text
        color="primary"
      >
        {{ $t('actions.edit') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import ContributionsLabel from '@/components/globals/ContributionsLable'
import MarkdownText from '@/components/ui/MarkdownText'

export default {
  name: 'WordCard',
  components: { MarkdownText, ContributionsLabel },
  mixins: [SessionConcern],
  props: {
    word: Object,
    presentation: {
      type: Boolean,
      default: true
    },
    flat: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
