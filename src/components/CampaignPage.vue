<script setup lang="ts">
import { ref } from 'vue'
import AdvancedWorkflowPage from './campaign/AdvancedWorkflowPage.vue'
import CampaignOverviewScreen from './campaign/CampaignOverviewScreen.vue'
import StandardWorkflowPage from './campaign/StandardWorkflowPage.vue'
import WorkflowModal from './campaign/WorkflowModal.vue'
import type {
  AdvancedBuilderStage,
  CampaignScreen,
  ImportMethod,
  StandardBuilderStage,
  WorkflowMode,
} from './campaign/campaignTypes'

const emit = defineEmits<{
  (e: 'update:breadcrumbs', value: string[]): void
}>()

const screen = ref<CampaignScreen>('overview')
const isWorkflowModalOpen = ref(false)
const selectedWorkflow = ref<WorkflowMode>('advanced')
const selectedMethod = ref<ImportMethod>(null)
const isLookalikeModalOpen = ref(false)
const advancedBuilderStage = ref<AdvancedBuilderStage>('choose-method')
const standardBuilderStage = ref<StandardBuilderStage>('leads-list')
const uploadedFile = ref<File | null>(null)

const onWorkflowNext = (workflow: WorkflowMode) => {
  selectedWorkflow.value = workflow

  if (workflow === 'advanced') {
    selectedMethod.value = null
    advancedBuilderStage.value = 'choose-method'
    uploadedFile.value = null
    screen.value = 'advanced-builder'
    emit('update:breadcrumbs', ['Campaign', 'Advance Campaign'])
    return
  }

  standardBuilderStage.value = 'leads-list'
  screen.value = 'standard-builder'
  emit('update:breadcrumbs', ['Campaign', 'Standard Campaign'])
}

const onSelectMethod = (method: Exclude<ImportMethod, null>) => {
  selectedMethod.value = method
  isLookalikeModalOpen.value = method === 'lookalike'
  if (method !== 'csv') uploadedFile.value = null

  if (method === 'linkedin') advancedBuilderStage.value = 'linkedin-details'
  else if (method === 'csv') advancedBuilderStage.value = 'csv-upload'
  else advancedBuilderStage.value = 'choose-method'
}

const onCsvFileSelected = (file: File) => {
  uploadedFile.value = file
  advancedBuilderStage.value = 'csv-mapping'
}

const onLookalikeListSelected = () => {
  isLookalikeModalOpen.value = false
  advancedBuilderStage.value = 'sender-profiles'
}

const onRemoveCsvFile = () => {
  uploadedFile.value = null
  advancedBuilderStage.value = 'csv-upload'
}

const onAdvancedBuilderNext = () => {
  if (selectedMethod.value === 'csv' && advancedBuilderStage.value === 'csv-upload') {
    advancedBuilderStage.value = 'csv-mapping'
  }
}

const onAdvancedBuilderPrevious = () => {
  if (advancedBuilderStage.value === 'sender-profiles') {
    advancedBuilderStage.value = 'choose-method'
  }
}

const onStandardBuilderNext = () => {
  if (standardBuilderStage.value === 'leads-list') {
    standardBuilderStage.value = 'target-audience'
    return
  }

  if (standardBuilderStage.value === 'target-audience') {
    standardBuilderStage.value = 'campaign-flow'
  }
}

const onStandardBuilderPrevious = () => {
  if (standardBuilderStage.value === 'campaign-flow') {
    standardBuilderStage.value = 'target-audience'
    return
  }

  if (standardBuilderStage.value === 'target-audience') {
    standardBuilderStage.value = 'leads-list'
  }
}

const goToOverview = () => {
  screen.value = 'overview'
  emit('update:breadcrumbs', ['Campaign'])
}

defineExpose({
  goToOverview,
})

emit('update:breadcrumbs', ['Campaign'])
</script>

<template>
  <v-card rounded="lg" class="campaign-page" elevation="0">
    <CampaignOverviewScreen
      v-if="screen === 'overview'"
      @new-campaign="isWorkflowModalOpen = true"
    />

    <AdvancedWorkflowPage
      v-else-if="screen === 'advanced-builder'"
      :selected-method="selectedMethod"
      :builder-stage="advancedBuilderStage"
      :is-lookalike-modal-open="isLookalikeModalOpen"
      :uploaded-file-name="uploadedFile?.name ?? null"
      @select-method="onSelectMethod"
      @update:lookalike-modal="isLookalikeModalOpen = $event"
      @file-selected="onCsvFileSelected"
      @lookalike-list-selected="onLookalikeListSelected"
      @remove-file="onRemoveCsvFile"
      @next="onAdvancedBuilderNext"
      @previous="onAdvancedBuilderPrevious"
    />

    <StandardWorkflowPage
      v-else
      :builder-stage="standardBuilderStage"
      @next="onStandardBuilderNext"
      @previous="onStandardBuilderPrevious"
    />

    <WorkflowModal
      v-model="isWorkflowModalOpen"
      @next="onWorkflowNext"
    />
  </v-card>
</template>

<style scoped>
.campaign-page {
  min-height: calc(100vh - 98px);
  padding: 14px;
  border: 1px solid #e8ebf2;
  background: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
</style>
