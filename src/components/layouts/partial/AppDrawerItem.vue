<template>
  <v-list-item
    :to="url ? url : null"
    :link="url !== undefined"
  >
    <v-list-item-icon v-if="icon">
      <v-icon
        :color="iconColor"
      >
        {{ icon }}
      </v-icon>
    </v-list-item-icon>
    <v-list-item-title>
      {{ title }}
    </v-list-item-title>
  </v-list-item>
</template>
<script>
export default {
  name: 'AppDrawerItem',
  props: {
    url: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    iconColor: {
      type: String,
      required: false,
      default: 'current'
    },
    title: String
  }
}
</script>
