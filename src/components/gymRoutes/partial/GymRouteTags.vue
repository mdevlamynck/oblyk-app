<template>
  <div>
    <span
      v-for="(section, index) in gymRoute.sections" :key="`section-${index}`"
    >
      <span v-if="gymRoute.sections.length > 1">
        L.{{ index + 1 }} :
      </span>
      <v-chip
        small
        class="mr-2"
        v-for="(tag, index) in section.tags" :key="`tag-${index}`"
      >
        <v-icon
          class="mr-1"
          small
        >
          mdi-pound
        </v-icon>
        {{ $t(`models.tags.${tag}`) }}
      </v-chip>
    </span>
  </div>
</template>
<script>
export default {
  name: 'GymRouteTags',
  props: {
    gymRoute: Object
  }
}
</script>
