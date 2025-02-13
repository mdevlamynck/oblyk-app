<template>
  <div>
    <spinner v-if="loadingGallery" />
    <v-row
      v-if="!loadingGallery"
      no-gutters
    >
      <v-col
        v-for="(photo, index) in photos"
        :key="`photo-${index}`"
        class="col-6 col-md-4 d-flex child-flex pa-1"
        v-bind:class="lgCol"
      >
        <photo-thumbnail
          :environnement-type="environnementType"
          :environnement-object="environnementObject"
          :photo-index="index"
          :photo="photo"
          :photos-gallery="photosGallery"
          :open-light-box-dialog="openLightBoxDialog"
        />
      </v-col>
      <v-col
        v-if="photos.length === 0"
      >
        <p class="text-center text--disabled mt-5 mb-5">
          {{ $t('components.photo.noPhoto') }}
        </p>
      </v-col>
    </v-row>

    <loading-more
      :get-function="getPhotos"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
      v-if="!loadingGallery"
    />

    <!-- Full screen dialog for lightbox -->
    <v-dialog
      dark
      v-model="lightBoxDialog"
      fullscreen
    >
      <v-card class="rounded-0">
        <light-box
          v-if="selectedPhoto"
          :photo="selectedPhoto"
          :photos-gallery="photos"
          :close-light-box-dialogue="closeLightBoxDialogue"
          :selected-index="selectedIndex"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import PhotoThumbnail from '@/components/photos/PhotoThumbnail'
import LightBox from '@/components/photos/LightBox'
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import Photo from '@/models/Photo'
import LoadingMore from '@/components/layouts/LoadingMore'
import AreaApi from '@/services/oblyk-api/AreaApi'
import CragSectorApi from '@/services/oblyk-api/CragSectorApi'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'
import CragApi from '@/services/oblyk-api/CragApi'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'

export default {
  name: 'PhotoGallery',
  mixins: [LoadingMoreHelpers],
  components: {
    LoadingMore,
    Spinner,
    LightBox,
    PhotoThumbnail
  },
  props: {
    lgCol: {
      type: String,
      required: false,
      default: 'col-lg-2'
    },
    preloadPhotos: Array,
    environnementType: String,
    environnementObject: Object,
    galleryType: String,
    galleryId: [Number, String]
  },

  data () {
    return {
      photos: [],
      loadingGallery: true,
      lightBoxDialog: false,
      selectedPhoto: null,
      selectedIndex: null
    }
  },

  computed: {
    photosGallery: function () {
      return this.photos.map(photo => { return photo.id })
    }
  },

  watch: {
    galleryId: function () {
      this.photos = []
      this.getPhotos()
    }
  },

  mounted () {
    this.getPhotos()
    this.$root.$on('LightBoxChangeSelectedIndex', (photoIndex) => {
      this.changeSelectedIndex(photoIndex)
    })
  },

  beforeDestroy () {
    this.$root.$off('LightBoxChangeSelectedIndex')
  },

  methods: {
    getPhotos: function () {
      let promise

      if (this.galleryType === 'User') {
        promise = UserApi
      } else if (this.galleryType === 'Area') {
        promise = AreaApi
      } else if (this.galleryType === 'CragSector') {
        promise = CragSectorApi
      } else if (this.galleryType === 'CragRoute') {
        promise = CragRouteApi
      } else if (this.galleryType === 'Crag') {
        promise = CragApi
      } else if (this.galleryType === 'GuideBookPaper') {
        promise = GuideBookPaperApi
      } else if (this.galleryType === 'CurrentUser') {
        promise = CurrentUserApi
      } else if (this.galleryType === 'Feed') {
        for (const photo of this.preloadPhotos) {
          this.photos.push(new Photo(photo))
        }
        this.loadingGallery = false
        this.noMoreDataToLoad = true
        return
      }

      this.moreIsBeingLoaded()
      promise
        .photos(this.galleryId, this.page)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingGallery = false
          this.finallyMoreIsLoaded()
        })
    },

    openLightBoxDialog: function (photoIndex) {
      this.lightBoxDialog = true
      setTimeout(() => {
        this.selectedPhoto = this.photos[photoIndex]
        this.selectedIndex = photoIndex
      }, 500)
    },

    closeLightBoxDialogue: function () {
      this.lightBoxDialog = false
    },

    changeSelectedIndex: function (photoIndex) {
      this.selectedPhoto = this.photos[photoIndex]
      this.selectedIndex = photoIndex
    }
  }
}
</script>
