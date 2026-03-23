<script setup lang="ts">
import emptyCampaign from "../../assets/empty-campaign.svg";

const emit = defineEmits<{
  (e: "new-campaign"): void;
}>();
</script>

<template>
  <section class="campaign-screen">
    <div class="toolbar">
      <v-select
        model-value="All"
        :items="['All']"
        density="default"
        variant="outlined"
        hide-details
        class="toolbar-filter" />

      <v-text-field
        model-value=""
        density="default"
        variant="outlined"
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        class="toolbar-search" />
    </div>

    <div class="campaign-canvas">
      <div class="empty-state">
        <img
          :src="emptyCampaign"
          alt="Campaign empty state"
          class="empty-illustration" />
        <v-btn
          color="primary"
          rounded="sm"
          size="small"
          class="new-button"
          @click="emit('new-campaign')"
          >New Campaign</v-btn
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.campaign-screen {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 18px;
  position: relative;
}

.campaign-canvas {
  min-height: 0;
  border: 1px solid #edf0f7;
  border-radius: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
  display: grid;
  position: relative;
  z-index: 1;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: #ffffff;
  position: relative;
  z-index: 2;
  width: fit-content;
  max-width: 100%;
}

.toolbar-filter {
  width: 140px;
}

.toolbar-search {
  width: 170px;
}

.toolbar :deep(.v-field) {
  min-height: 38px;
  border-radius: 6px;
  background: #ffffff;
}

.toolbar :deep(.v-field__input) {
  min-height: 38px;
  padding-top: 7px;
  padding-bottom: 7px;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  line-height: 24px;
  color: #5e5873;
}

.toolbar :deep(.v-input__details) {
  display: none;
}

.toolbar :deep(.v-field--variant-outlined .v-field__outline) {
  --v-field-border-opacity: 1;
  color: #d8d6de;
}

.toolbar :deep(.v-field__append-inner .v-icon),
.toolbar :deep(.v-field__prepend-inner .v-icon) {
  font-size: 18px;
  color: #5e5873;
}

.empty-state {
  min-height: clamp(420px, 68vh, 760px);
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 10px;
  padding: 24px;
}

.empty-illustration {
  width: min(330px, 100%);
  height: auto;
  opacity: 0.95;
}

.new-button {
  min-width: 110px;
  text-transform: none;
}
</style>
