<script setup lang="ts">
defineProps<{
  activeStep?: 'audience' | 'sender'
}>()
</script>

<template>
  <div class="step-tabs">
    <div class="steps-row">
      <div class="step-group">
        <button type="button" class="step-item">
          <span class="step-icon" :class="{ 'step-icon-muted': activeStep !== 'audience' }">
            <v-icon size="16" :color="activeStep === 'audience' ? 'white' : '#5E5873'">mdi-format-list-checks</v-icon>
          </span>
          <span>Define Target Audience</span>
        </button>
        <v-icon size="22" color="#6E6B7B">mdi-chevron-right</v-icon>
      </div>
      <div class="step-group">
        <button type="button" class="step-item">
          <span class="step-icon" :class="{ 'step-icon-muted': activeStep !== 'sender' }">
            <v-icon size="16" :color="activeStep === 'sender' ? 'white' : '#5E5873'">mdi-account-search</v-icon>
          </span>
          <span :class="{ 'step-muted-text': activeStep !== 'sender' }">Sender Profiles</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-tabs {
  width: 100%;
  height: 62px;
  border: 1px solid #ebe9f1;
  border-radius: 6px;
  padding: 0 14px;
  box-sizing: border-box;
  background: #ffffff;
}

.steps-row {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 18px;
}

.step-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-item {
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  color: #444050;
  font-size: 13px;
  line-height: 21px;
  font-weight: 500;
  white-space: nowrap;
}

.step-icon {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: #3666ee;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.step-icon-muted {
  background: #e8e8e8;
}

.step-muted-text {
  color: #5e5873;
}
</style>
