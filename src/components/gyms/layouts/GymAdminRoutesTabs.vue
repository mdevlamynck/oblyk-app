<template>
  <v-tabs show-arrows >
    <v-tab :to="gym.path('admin')">
      <v-icon>mdi-arrow-left</v-icon>
    </v-tab>
    <v-tab to="tables">
      {{ $t('components.gym.tabs.tables') }}
    </v-tab>

    <v-tab to="statistics">
      {{ $t('components.gym.tabs.statistics') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'GymAdminRoutesTabs',
  props: {
    gym: Object
  }
}
</script>
