<template>
  <v-select
    v-model="emailNotifications"
    :items="emailNotificationsList"
    item-text="text"
    item-value="value"
    chips
    clearable
    :label="$t('components.input.emailNotifications')"
    multiple
    outlined
    @change="onChange()"
  ></v-select>
</template>

<script>
export default {
  name: 'EmailNotifiableListInput',
  props: {
    value: Array
  },

  data () {
    return {
      emailNotificationsList: [
        { text: this.$t('models.emailNotifications.new_message'), value: 'new_message' },
        { text: this.$t('models.emailNotifications.request_for_follow_up'), value: 'request_for_follow_up' },
        { text: this.$t('models.emailNotifications.new_article'), value: 'new_article' }
      ],
      emailNotifications: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.emailNotifications)
    }
  }
}
</script>
