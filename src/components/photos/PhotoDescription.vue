<template>
  <div class="pb-5 photo-description">
    <!-- Description -->
    <v-card-text v-if="photo.description">
      <markdown-text :text="photo.description" />
    </v-card-text>

    <!-- Crag, Sector, Route, etc. -->
    <v-card-title class="caption pb-0">
      <router-link
        :title="illustrableObject.name"
        :to="illustrableObject.path()"
        class="discrete-link text-truncate"
      >
        <v-icon left small>mdi-terrain</v-icon>
        {{ illustrableObject.name }}
      </router-link>
    </v-card-title>

    <!-- Copyright -->
    <v-card-title
      class="caption text-truncate pb-0 pt-2"
      v-if="photo.source"
    >
      <v-icon left small>mdi-link</v-icon>
      {{ photo.source }}
    </v-card-title>

    <!-- Copyright -->
    <v-card-title class="caption pb-0 pt-2">
      <v-icon left small>mdi-copyright</v-icon>
      {{ photo.copy }}
    </v-card-title>

    <!-- Model et exif -->
    <v-card-title
      v-if="photo.exif_model || photo.exif_make"
      class="caption pb-0 pt-2"
    >
      <v-icon left small>mdi-camera</v-icon>
      {{ photo.exif_model }} {{ photo.exif_make }}
    </v-card-title>

    <!-- Model et exif -->
    <v-card-title
      v-if="photo.creator.uuid"
      class="caption pb-0 pt-2"
    >
      <v-icon left small>mdi-account</v-icon>
      <router-link
        :to="photo.Creator.path()"
      >
        {{ photo.Creator.name }}
      </router-link>
    </v-card-title>
  </div>
</template>

<script>
import MarkdownText from '@/components/ui/MarkdownText'
export default {
  name: 'PhotoDescription',
  components: { MarkdownText },
  props: {
    photo: Object,
    illustrableObject: Object
  }
}
</script>

<style lang="scss" >
.photo-description {
  width: 250px;
}
</style>
