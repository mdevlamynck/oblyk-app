<template>
  <div class="global-app-title">
    <v-avatar
      :size="isMobile ? 32 : 48"
      v-if="avatar && showAvatar"
      :class="isMobile ? 'mr-1' : 'mr-3'"
    >
      <v-img
        :src="avatar"
        :alt="`avatar ${title}`"
      />
    </v-avatar>
    <span v-if="showTitle && title">
      {{ title || 'Oblyk' }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AppBarTitle',

  data () {
    return {
      showTitle: true,
      showAvatar: false,
      title: null,
      avatar: null,
      isMobile: false
    }
  },

  mounted () {
    this.$root.$on('setTitleAppBar', (title) => { this.setTitle(title) })
    this.$root.$on('setAvatarAppBar', (avatar) => { this.setAvatar(avatar) })

    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  beforeDestroy () {
    this.$root.$off('setTitleAppBar')
    this.$root.$off('setAvatarAppBar')
  },

  methods: {
    onResize: function () {
      this.isMobile = window.innerWidth < 600
    },

    setTitle: function (title) {
      this.title = title
      this.title = true
    },

    setAvatar: function (avatar) {
      this.avatar = avatar
      this.avatar = true
    }
  }
}
</script>

<style lang="scss" scoped>
.global-app-title {
  a {
    color: inherit !important;
    text-decoration: none;
  }
}
</style>
