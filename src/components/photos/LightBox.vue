<template>
  <div class="light-box-area">
    <!-- Close lightBox -->
    <v-btn
      class="close-light-box-btn"
      @click="closeLightBoxDialogue()"
      icon
      large
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <!-- Previous picture -->
    <light-box-arrow
      class="light-box-arrow previous-arrow"
      direction="previous"
      :selected-index="selectedIndex"
      :photos-gallery="photosGallery"
    />

    <!-- Photo info -->
    <photo-card-info class="photo-information" :photo="photo" />

    <!-- Photo collection -->
    <photo-collection
      class="photo-collection"
      :photos="photosGallery"
    />

    <!-- Picture viewer -->
    <v-col class="full-height pb-0 pt-0">
      <photo-viewer :photo="photo" />
    </v-col>

    <!-- Next picture -->
    <light-box-arrow
      class="light-box-arrow next-arrow"
      direction="next"
      :selected-index="selectedIndex"
      :photos-gallery="photosGallery"
    />
  </div>
</template>

<script>
import LightBoxArrow from '@/components/photos/LightBoxArrow'
import PhotoCardInfo from '@/components/photos/PhotoCardInfo'
import PhotoCollection from '@/components/photos/PhotoCollection'
import PhotoViewer from '@/components/photos/PhotoViewer'

export default {
  name: 'LightBox',
  components: {
    PhotoViewer,
    PhotoCollection,
    PhotoCardInfo,
    LightBoxArrow
  },

  props: {
    photo: Object,
    photosGallery: Array,
    closeLightBoxDialogue: Function,
    selectedIndex: Number
  }
}
</script>

<style lang="scss" scoped>
.light-box-area {
  height: 100vh;
  background-color: #121212;
  .close-light-box-btn {
    z-index: 1000;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .photo-information {
    left: 10px;
    top: 10px;
    z-index: 15;
    max-width: 100%;
    position: absolute;
  }
  .photo-collection {
    left: 10px;
    top: 50px;
    z-index: 10;
    max-width: 100%;
    position: absolute;
  }
  .close-lightbox-photo {
    z-index: 10;
  }
  .light-box-arrow {
    position: absolute;
    z-index: 10;
    top: 50vh;
    &.previous-arrow {
      left: 5px;
    }
    &.next-arrow {
      right: 5px;
    }
  }
}
</style>
