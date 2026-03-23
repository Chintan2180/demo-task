<script setup lang="ts">
const props = defineProps<{
  activeStep?: "leads-list" | "target-audience" | "campaign-flow";
}>();
</script>

<template>
  <div class="step-tabs">
    <div class="steps-row">
      <div class="step-group">
        <button type="button" class="step-item">
          <span
            class="step-icon"
            :class="{ 'step-icon-muted': props.activeStep !== 'leads-list' }">
            <v-icon
              size="18"
              :color="props.activeStep === 'leads-list' ? 'white' : '#9692A4'">
              mdi-format-list-checks
            </v-icon>
          </span>
          <span :class="{ 'step-muted-text': props.activeStep !== 'leads-list' }">
            Leads List
          </span>
        </button>
        <v-icon size="22" color="#6E6B7B">mdi-chevron-right</v-icon>
      </div>
      <div class="step-group">
        <button type="button" class="step-item">
          <span
            class="step-icon"
            :class="{ 'step-icon-muted': props.activeStep !== 'target-audience' }">
            <v-icon
              size="18"
              :color="props.activeStep === 'target-audience' ? 'white' : '#9692A4'">
              mdi-navigation-outline
            </v-icon>
          </span>
          <span :class="{ 'step-muted-text': props.activeStep !== 'target-audience' }">
            Target Audience
          </span>
        </button>
        <v-icon size="22" color="#6E6B7B">mdi-chevron-right</v-icon>
      </div>
      <div class="step-group">
        <button type="button" class="step-item">
          <span
            class="step-icon"
            :class="{ 'step-icon-muted': props.activeStep !== 'campaign-flow' }">
            <v-icon
              size="18"
              :color="props.activeStep === 'campaign-flow' ? 'white' : '#9692A4'">
              mdi-bullhorn-outline
            </v-icon>
          </span>
          <span :class="{ 'step-muted-text': props.activeStep !== 'campaign-flow' }">
            Campaign
          </span>
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
  padding: 0 25px;
  box-sizing: border-box;
  background: #ffffff;
}

.steps-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 8px;
}

.step-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-item {
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  color: #444050;
  font-family: Inter, sans-serif;
  font-size: 15px;
  line-height: 21px;
  font-weight: 500;
  white-space: nowrap;
  min-height: 38px;
}

.step-icon {
  width: 38px;
  height: 38px;
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
