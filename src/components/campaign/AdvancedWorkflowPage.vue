<script setup lang="ts">
import CsvMappingPanel from "./CsvMappingPanel.vue";
import CsvUploadPanel from "./CsvUploadPanel.vue";
import ImportMethodSection from "./ImportMethodSection.vue";
import LinkedInSearchPanel from "./LinkedInSearchPanel.vue";
import LookalikeModal from "./LookalikeModal.vue";
import SenderProfilesPanel from "./SenderProfilesPanel.vue";
import StepTabsBar from "./StepTabsBar.vue";
import type { AdvancedBuilderStage, ImportMethod } from "./campaignTypes";

const props = defineProps<{
  selectedMethod: ImportMethod;
  builderStage: AdvancedBuilderStage;
  isLookalikeModalOpen: boolean;
  uploadedFileName?: string | null;
}>();

const emit = defineEmits<{
  (e: "select-method", value: Exclude<ImportMethod, null>): void;
  (e: "next"): void;
  (e: "previous"): void;
  (e: "update:lookalike-modal", value: boolean): void;
  (e: "file-selected", file: File): void;
  (e: "remove-file"): void;
  (e: "lookalike-list-selected", value: string): void;
}>();
</script>

<template>
  <div class="advanced-page">
    <div class="step-shell">
      <StepTabsBar :active-step="props.builderStage === 'sender-profiles' ? 'sender' : 'audience'" />

      <SenderProfilesPanel v-if="props.builderStage === 'sender-profiles'" />

      <template v-else>
        <ImportMethodSection
          class="import-method-block"
          :selected-method="props.selectedMethod"
          @select="emit('select-method', $event)" />

        <LinkedInSearchPanel v-if="props.builderStage === 'linkedin-details'" />
        <CsvUploadPanel
          v-else-if="props.builderStage === 'csv-upload'"
          :uploaded-file-name="props.uploadedFileName"
          @file-selected="emit('file-selected', $event)" />
        <CsvMappingPanel
          v-else-if="props.builderStage === 'csv-mapping'"
          :uploaded-file-name="props.uploadedFileName"
          @remove-file="emit('remove-file')" />
      </template>
    </div>

    <div class="advanced-footer">
      <template v-if="props.builderStage === 'sender-profiles'">
        <v-btn class="btn-previous" variant="text" @click="emit('previous')">Previous</v-btn>
        <v-btn class="btn-next active-btn" variant="flat" @click="emit('next')">Submit</v-btn>
      </template>
      <v-btn v-else class="btn-next" variant="flat" @click="emit('next')">Next</v-btn>
    </div>

    <LookalikeModal
      :model-value="props.isLookalikeModalOpen"
      @update:model-value="emit('update:lookalike-modal', $event)"
      @select-list="emit('lookalike-list-selected', $event)" />
  </div>
</template>

<style scoped>
.advanced-page {
  min-height: calc(100vh - 125px);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step-shell {
  border-radius: 6px;
  border: 1px solid #ebe9f1;
  padding: 16px 18px 20px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
}

.import-method-block {
  margin-top: 18px;
}

.advanced-footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 12px 0 0;
}
.btn-previous {
  text-transform: none;
  color: #3666ee;
}
.btn-next {
  width: 81px;
  height: 37px;
  background: #3664ee;
  opacity: 0.65;
  box-shadow: inset 0 4px 8.4px rgba(38, 137, 242, 0.42);
  border-radius: 5px;
  color: #fff;
  text-transform: none;
  letter-spacing: 0.4px;
}
.active-btn {
  opacity: 1;
}
</style>
