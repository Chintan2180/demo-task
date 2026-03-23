<script setup lang="ts">
import { ref } from 'vue'
import CampaignPage from './components/CampaignPage.vue'
import AppLayout from './components/layout/AppLayout.vue'

const breadcrumbItems = ref<string[]>(['Campaign'])
const campaignPageRef = ref<InstanceType<typeof CampaignPage> | null>(null)

const onBreadcrumbClick = (item: string) => {
  if (item !== 'Campaign') return
  campaignPageRef.value?.goToOverview()
}
</script>

<template>
  <v-app>
    <AppLayout :breadcrumb-items="breadcrumbItems" @breadcrumb-click="onBreadcrumbClick">
      <CampaignPage ref="campaignPageRef" @update:breadcrumbs="breadcrumbItems = $event" />
    </AppLayout>
  </v-app>
</template>
