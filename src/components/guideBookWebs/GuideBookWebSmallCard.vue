<template>
  <div>
    <v-card
      flat
    >
      <v-list-item three-line>
        <v-list-item-avatar
          rounded="0"
          size="70"
        >
          <v-img
            :src="guideBookWeb.coverUrl()"
            contain
            max-width="70px"
            max-height="70px"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ guideBookWeb.name }}
              <v-btn
                v-if="isLoggedIn && loggedInUser.uuid === guideBookWeb.creator.uuid"
                icon
                :to="`${guideBookWeb.path('edit')}?redirect_to=${$route.fullPath}`"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="mb-1 mt-n6 text-truncate">
            <a :href="guideBookWeb.url" class="vertical-align-middle">
              {{ guideBookWeb.url }}
            </a>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GuideBookWebSmallCard',
  mixins: [SessionConcern],
  props: {
    guideBookWeb: Object
  }
}
</script>
