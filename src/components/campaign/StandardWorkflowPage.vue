<script setup lang="ts">
import { ref } from "vue";
import StandardStepTabsBar from "./StandardStepTabsBar.vue";
import type { StandardBuilderStage } from "./campaignTypes";

const props = defineProps<{
  builderStage: StandardBuilderStage;
}>();

const emit = defineEmits<{
  (e: "next"): void;
  (e: "previous"): void;
}>();

const campaignName = ref("");
const campaignType = ref("LinkedIn Invitation");
const channel = ref("linkedin-email");
const schedule = ref("Mon - Fri 9:00 AM - 5:00 PM");
const linkedinUrl = ref("");
const webhookEnabled = ref(false);
const audienceFile = ref<File | null>(null);
const audienceFileInput = ref<HTMLInputElement | null>(null);

const acceptedMimeTypes = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const isAcceptedFile = (file: File) => {
  const lowerName = file.name.toLowerCase();
  return (
    acceptedMimeTypes.includes(file.type) ||
    lowerName.endsWith(".csv") ||
    lowerName.endsWith(".xls") ||
    lowerName.endsWith(".xlsx")
  );
};

const openAudienceFilePicker = () => {
  audienceFileInput.value?.click();
};

const handleAudienceFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (!isAcceptedFile(file)) {
    input.value = "";
    return;
  }

  audienceFile.value = file;
  input.value = "";
};

const handleAudienceDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files?.[0];
  if (!file) return;
  if (!isAcceptedFile(file)) return;
  audienceFile.value = file;
};
</script>

<template>
  <div class="advanced-page">
    <div class="step-shell">
      <StandardStepTabsBar :active-step="props.builderStage" />

      <section
        v-if="props.builderStage === 'leads-list'"
        class="content-body leads-grid">
        <div class="campaign-name-field">
          <label class="field-label">Campaign Name</label>
          <v-text-field
            v-model="campaignName"
            variant="outlined"
            density="default"
            hide-details
            placeholder="e.g. Founder Outreach - India" />
          <p class="field-helper">
            Give your workflow a clear name so you can find it later.
          </p>
        </div>
        <div class="campaign-type-field">
          <label class="field-label">Campaign Type</label>
          <v-select
            v-model="campaignType"
            :items="['LinkedIn Invitation']"
            variant="outlined"
            density="default"
            hide-details />
          <p class="field-helper">Choose how this workflow will start.</p>
        </div>
        <div>
          <label class="field-label">Outreach Channel</label>
          <div class="pill-group">
            <button type="button" class="pill-btn pill-left">Email Only</button>
            <button type="button" class="pill-btn pill-middle">
              LinkedIn Only
            </button>
            <button
              type="button"
              class="pill-btn pill-right"
              :class="{ selected: channel === 'linkedin-email' }"
              @click="channel = 'linkedin-email'">
              LinkedIn + Email
            </button>
          </div>
          <p class="field-helper">
            Select how you want to reach your leads in this workflow.
          </p>
        </div>
        <div class="sending-schedule-field">
          <label class="field-label">Sending Schedule</label>
          <div class="schedule-row">
            <v-select
              v-model="schedule"
              :items="['Mon - Fri 9:00 AM - 5:00 PM']"
              variant="outlined"
              density="default"
              hide-details
              class="schedule-select" />
            <button class="small-outline-btn" type="button">
              + Add new time
            </button>
          </div>
          <p class="field-helper">
            Messages are sent only within your selected hours.
          </p>
        </div>
      </section>

      <section
        v-else-if="props.builderStage === 'target-audience'"
        class="content-body target-audience-body">
        <div class="audience-grid">
          <div class="audience-card audience-search-card">
            <label class="audience-label">Basic LinkedIn Search</label>
            <v-text-field
              v-model="linkedinUrl"
              variant="outlined"
              density="default"
              hide-details
              placeholder="https://www.linkedin.com/search/results/people/..." />
            <p class="audience-helper">
              Filter profiles in the <a href="#">LinkedIn search</a> and paste the URL above
            </p>
          </div>

          <div class="audience-card audience-upload-card">
            <label class="audience-label">Upload CSV File</label>
            <button
              type="button"
              class="drop-zone"
              @click="openAudienceFilePicker"
              @dragover.prevent
              @drop.prevent="handleAudienceDrop">
              <span class="upload-mini-icon">
                <v-icon size="14" color="#3666EE">mdi-upload-outline</v-icon>
              </span>
              <span>{{ audienceFile ? audienceFile.name : "Drop file here" }}</span>
            </button>
            <input
              ref="audienceFileInput"
              type="file"
              class="hidden-file-input"
              accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              @change="handleAudienceFileSelect" />
          </div>

          <div class="audience-card audience-options-card">
            <label class="audience-label">Advanced options</label>
            <label class="webhook-row">
              <span class="fake-checkbox" :class="{ checked: webhookEnabled }">
                <input v-model="webhookEnabled" type="checkbox" />
              </span>
              <span>Use Webhook</span>
            </label>
            <p class="audience-helper muted">Use a webhook to send leads automatically.</p>
          </div>
        </div>
      </section>

      <section v-else class="content-body campaign-flow-body">
        <div class="timeline-line" />

        <div class="campaign-block campaign-start-block">
          <div class="block-title-row">
            <v-icon size="18" color="#3666EE">mdi-rocket-outline</v-icon>
            <h4>Campaign Start</h4>
          </div>
          <p>When a lead enters your target audience</p>
        </div>

        <div class="campaign-block message-block">
          <div class="block-title-row">
            <v-icon size="18" color="#3666EE">mdi-linkedin</v-icon>
            <h4>Send LinkedIn Connection Request</h4>
          </div>
          <div class="message-body">
            <p>Hi [[first_name]]...</p>
            <div class="message-actions">
              <button type="button" class="btn-edit">Edit Message</button>
              <button type="button" class="btn-ai">
                <v-icon size="16" color="#3666EE">mdi-auto-fix</v-icon>
                <span>Make with AI</span>
              </button>
            </div>
          </div>
          <div class="block-icon-actions">
            <button type="button" class="icon-btn edit-btn">
              <v-icon>mdi-pencil-outline</v-icon>
            </button>
            <button type="button" class="icon-btn delete-btn">
              <v-icon>mdi-delete-outline</v-icon>
            </button>
          </div>
        </div>

        <div class="campaign-block message-block large">
          <div class="block-title-row">
            <v-icon size="18" color="#3666EE">mdi-share-outline</v-icon>
            <h4>Set Follow-up message</h4>
          </div>
          <div class="message-body">
            <p>Hi [[first_name]]...</p>
            <div class="message-actions">
              <button type="button" class="btn-edit">Edit Message</button>
              <button type="button" class="btn-ai">
                <v-icon size="16" color="#3666EE">mdi-auto-fix</v-icon>
                <span>Make with AI</span>
              </button>
            </div>
          </div>
          <div class="block-icon-actions">
            <button type="button" class="icon-btn edit-btn">
              <v-icon>mdi-pencil-outline</v-icon>
            </button>
            <button type="button" class="icon-btn delete-btn">
              <v-icon>mdi-delete-outline</v-icon>
            </button>
          </div>

          <div class="wait-row">
            <span>Once accepted wait</span>
            <span class="wait-pill">3</span>
            <span>Minutes</span>
            <span class="wait-pill">3</span>
            <span>Hour</span>
            <span class="wait-pill">3</span>
            <span>days</span>
          </div>
        </div>

        <button type="button" class="add-followup-row">
          <v-icon size="18" color="#3666EE">mdi-plus-circle-outline</v-icon>
          <span>Add new follow-up</span>
        </button>

        <div class="campaign-block campaign-end-block">
          <div class="block-title-row">
            <v-icon size="18" color="#3666EE">mdi-minus-box-outline</v-icon>
            <h4>End of Campaign</h4>
          </div>
        </div>
      </section>
    </div>

    <div class="advanced-footer">
      <template v-if="props.builderStage === 'leads-list'">
        <v-btn class="btn-next active-btn" variant="flat" @click="emit('next')"
          >Continue</v-btn
        >
      </template>
      <template v-else-if="props.builderStage === 'target-audience'">
        <div class="target-footer">
          <v-btn class="btn-previous" variant="text" @click="emit('previous')"
            >Back</v-btn
          >
          <div class="target-footer-actions">
            <v-btn class="btn-secondary" variant="flat">Save as Draft</v-btn>
            <v-btn class="btn-next active-btn" variant="flat" @click="emit('next')"
              >Continue</v-btn
            >
          </div>
        </div>
      </template>
      <template v-else>
        <v-btn class="btn-previous" variant="text" @click="emit('previous')"
          >Back</v-btn
        >
        <v-btn class="btn-secondary" variant="flat">Save as Draft</v-btn>
        <v-btn class="btn-next active-btn" variant="flat"
          >Launch Campaign</v-btn
        >
      </template>
    </div>
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
  padding: 16px 18px 20px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.advanced-footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 12px 0 0;
}
.content-body {
  border: 1px solid #ebe9f1;
  border-radius: 8px;
  padding: 18px;
}
.leads-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.field-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #444050;
}
.field-helper {
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 12px;
  color: #8b8c9f;
}
.campaign-name-field .field-label {
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: #5e5873;
}
.campaign-name-field .field-helper {
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #9692a4;
}
.campaign-name-field :deep(.v-field) {
  min-height: 52px;
  border-radius: 5px;
  background: #fff;
}
.campaign-name-field :deep(.v-field--variant-outlined .v-field__outline) {
  --v-field-border-opacity: 1;
  color: #d8d6de;
}
.campaign-name-field :deep(.v-field__input) {
  min-height: 52px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #5e5873;
}
.campaign-name-field :deep(.v-field__input::placeholder) {
  color: #b9b9c3;
  opacity: 1;
}
.campaign-type-field .field-label {
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: #5e5873;
}
.campaign-type-field .field-helper {
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #9692a4;
}
.campaign-type-field :deep(.v-field) {
  min-height: 52px;
  border-radius: 5px;
  background: #fff;
}
.campaign-type-field :deep(.v-field--variant-outlined .v-field__outline) {
  --v-field-border-opacity: 1;
  color: #d8d6de;
}
.campaign-type-field :deep(.v-select__selection-text) {
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #334155;
}
.campaign-type-field :deep(.v-field__input) {
  min-height: 52px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.campaign-type-field :deep(.v-field__append-inner .v-icon) {
  color: #5e5873;
  font-size: 18px;
}
.pill-group {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.pill-btn {
  box-sizing: border-box;
  border: 1px solid #d8d6de;
  min-height: 40px;
  height: 40px;
  background: #fff;
  color: #b9b9c3;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}
.pill-left {
  border-radius: 5px 0 0 5px;
}
.pill-middle {
  border-radius: 0;
  border-left: 0;
}
.pill-right {
  border-radius: 0 5px 5px 0;
  border-left: 0;
}
.pill-btn.selected {
  border-color: #3666ee;
  color: #3666ee;
  background: #f6f8ff;
}
.schedule-row {
  display: flex;
  gap: 10px;
}
.schedule-select {
  flex: 1;
}
.sending-schedule-field .field-label {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: #5e5873;
}
.sending-schedule-field .field-helper {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #9692a4;
}
.sending-schedule-field .schedule-row {
  display: flex;
  gap: 11px;
  align-items: center;
}
.sending-schedule-field .schedule-select {
  flex: 1;
}
.sending-schedule-field :deep(.schedule-select .v-field) {
  min-height: 38px;
  border-radius: 5px;
  background: #fff;
}
.sending-schedule-field
  :deep(.schedule-select .v-field--variant-outlined .v-field__outline) {
  --v-field-border-opacity: 1;
  color: #d8d6de;
}
.sending-schedule-field :deep(.schedule-select .v-field__input) {
  min-height: 38px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #b9b9c3;
}
.sending-schedule-field :deep(.schedule-select .v-field__append-inner .v-icon) {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #d8d6de;
  color: transparent;
  font-size: 0;
}
.small-outline-btn {
  box-sizing: border-box;
  width: 183px;
  height: 38px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  background: #fff;
  color: #b9b9c3;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}
.target-audience-body {
  border: 0;
  padding: 0;
}
.audience-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr 1fr;
  gap: 23px;
  width: 100%;
}
.audience-card {
  box-sizing: border-box;
  min-height: 147px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  background: #fff;
  padding: 20px;
  min-width: 0;
}
.audience-label {
  display: block;
  margin-bottom: 14px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: #5e5873;
}
.audience-helper {
  margin-top: 8px;
  margin-bottom: 0;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #9692a4;
}
.audience-helper a {
  color: #3666ee;
  text-decoration: none;
}
.audience-search-card :deep(.v-field) {
  min-height: 38px;
  border-radius: 5px;
}
.audience-search-card :deep(.v-field--variant-outlined .v-field__outline) {
  --v-field-border-opacity: 1;
  color: #d8d6de;
}
.audience-search-card :deep(.v-field__input) {
  min-height: 38px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: #b9b9c3;
}
.drop-zone {
  width: 100%;
  height: 93px;
  border: 1px dashed #3666ee;
  border-radius: 4px;
  background: #fff;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  color: #3666ee;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
}
.upload-mini-icon {
  width: 21px;
  height: 21px;
  border-radius: 4px;
  background: #eaefff;
  display: grid;
  place-items: center;
}
.hidden-file-input {
  display: none;
}
.webhook-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #b9b9c3;
}
.fake-checkbox {
  width: 18px;
  height: 18px;
  border: 1.5px solid #d8d6de;
  border-radius: 3px;
  display: inline-grid;
  place-items: center;
}
.fake-checkbox input {
  width: 0;
  height: 0;
  opacity: 0;
}
.fake-checkbox.checked {
  background: #3666ee;
  border-color: #3666ee;
}
.audience-helper.muted {
  color: #b9b9c3;
  margin-top: 20px;
}
.campaign-flow-body {
  position: relative;
  border: 0;
  padding: 0 0 2px 44px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.timeline-line {
  position: absolute;
  left: 27px;
  top: 18px;
  bottom: 22px;
  border-left: 3px solid #eaefff;
}
.campaign-block {
  position: relative;
  border: 1px solid #ebe9f1;
  border-radius: 5px;
  background: #fff;
}
.campaign-block::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1.5px solid #3666ee;
  border-radius: 50%;
  background: #fff;
  left: -23px;
  top: 18px;
}
.campaign-start-block {
  min-height: 77px;
  padding: 14px 24px 12px;
}
.campaign-start-block p {
  margin: 6px 0 0;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  line-height: 15px;
  color: #b9b9c3;
}
.block-title-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.block-title-row h4 {
  margin: 0;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #5e5873;
}
.message-block {
  min-height: 186px;
  padding: 14px 24px 16px;
}
.message-block.large {
  min-height: 243px;
}
.message-body {
  position: relative;
  margin-top: 10px;
  border: 1px solid #ebe9f1;
  border-radius: 5px;
  min-height: 120px;
  padding: 8px 16px 14px;
}
.message-body p {
  margin: 0;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  line-height: 15px;
  color: #444050;
}
.message-actions {
  display: flex;
  gap: 10px;
  margin-top: 50px;
}
.btn-edit {
  height: 38px;
  min-width: 146px;
  border: 0;
  border-radius: 5px;
  background: linear-gradient(239.27deg, #8ba6ff -27.06%, #3762ee 83.4%);
  color: #fff;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.4px;
}
.btn-ai {
  height: 38px;
  min-width: 171px;
  border: 1px solid #3666ee;
  border-radius: 5px;
  background: #fff;
  color: #3666ee;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.block-icon-actions {
  position: absolute;
  right: 20px;
  top: 7px;
  display: flex;
  gap: 0;
}
.icon-btn {
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-btn :deep(.v-icon) {
  font-size: 18px;
  line-height: 18px;
}
.icon-btn.edit-btn :deep(.v-icon) {
  color: #000000;
}
.icon-btn.delete-btn :deep(.v-icon) {
  color: #ea5455;
}
.wait-row {
  margin-top: 9px;
  width: 100%;
  min-height: 54px;
  border: 1px dashed #ebe9f1;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0 16px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: #444050;
}
.wait-pill {
  min-width: 34px;
  height: 20px;
  border: 1px solid #ebe9f1;
  border-radius: 5px;
  display: inline-grid;
  place-items: center;
}
.add-followup-row {
  width: 100%;
  min-height: 50px;
  border: 1px dashed #ebe9f1;
  border-radius: 5px;
  background: #f9f9f9;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #5e5873;
}
.campaign-end-block {
  min-height: 50px;
  padding: 15px 24px;
  background: #eaefff;
}
.btn-previous {
  text-transform: none;
  color: #3666ee;
}
.btn-next {
  width: 183px;
  height: 37px;
  padding: 10px 23px;
  gap: 10px;
  background: linear-gradient(239.27deg, #8ba6ff -27.06%, #3762ee 83.4%);
  border-radius: 5px;
  color: #fff;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.4px;
  text-transform: none;
}
.active-btn {
  opacity: 1;
}
.btn-secondary {
  min-width: 120px;
  height: 37px;
  background: #e8e8e8;
  color: #9692a4;
  text-transform: none;
}
.target-footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.target-footer-actions {
  display: flex;
  align-items: center;
  gap: 9px;
}
</style>
