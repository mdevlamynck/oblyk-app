<template>
  <div
    v-click-outside="closeCollection"
  >
    <div v-show="!collection">
      <v-btn
        icon
        @click="collection = true"
      >
        <v-icon>mdi-image-multiple</v-icon>
      </v-btn>
    </div>
    <v-card class="photo-collection-card" v-show="collection">
      <v-card-text
        class="photo-collection-area"
      >
        <div>
          <v-img
            v-for="(photo, index) in photos"
            :key="photo.id"
            class="collection-thumbnail-photo"
            :src="photo.thumbnailUrl()"
            :height="100"
            :width="100"
            @click="changeSelectedPhoto(index)"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'PhotoCollection',
  props: {
    photos: Array
  },

  data () {
    return {
      collection: false,
      loadingPhotos: true
    }
  },

  methods: {
    closeCollection: function () {
      this.collection = false
    },

    changeSelectedPhoto: function (photoIndex) {
      this.$root.$emit('LightBoxChangeSelectedIndex', photoIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-collection-area {
  padding-top: 22px;
  p {
    margin-top: 130px;
  }
}
.photo-collection-card {
  width: 375px;
  height: 375px;
  overflow-y: auto;
}
.collection-thumbnail-photo {
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
