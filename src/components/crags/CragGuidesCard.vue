<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-bookshelf
      </v-icon>
      {{ $t('components.crag.tabs.guideBooks') }}
    </v-card-title>
    <v-card-text>
      <guide-list
        :crag="crag"
        :limite="3"
        link-to-more="guide-books"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import GuideList from '@/components/crags/GuideList'

export default {
  name: 'CragGuidesCard',
  components: { GuideList },
  props: {
    crag: Object
  }
}
</script>
