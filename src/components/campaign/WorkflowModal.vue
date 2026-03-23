<script setup lang="ts">
import { ref } from "vue";
import workflowCard from "../../assets/workflow-card.svg";
import workflowCards from "../../assets/workflow-cards.svg";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "next", workflow: "advanced" | "standard"): void;
}>();

const selectedWorkflow = ref<"advanced" | "standard">("advanced");
const close = () => emit("update:modelValue", false);
const onNext = () => {
  emit("next", selectedWorkflow.value);
  close();
};
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', !!$event)"
    width="643"
    scrim="#0f172a"
    content-class="workflow-dialog">
    <div class="workflow-modal">
      <div class="workflow-header">
        <div>
          <h3 class="workflow-title">Select Workflow Mode</h3>
          <p class="workflow-subtitle">
            Choose how you want your campaign to behave
          </p>
        </div>
        <v-btn icon variant="text" size="small" color="#64748B" @click="close"
          ><v-icon>mdi-close-circle-outline</v-icon></v-btn
        >
      </div>

      <button
        type="button"
        class="workflow-option"
        :class="{ selected: selectedWorkflow === 'advanced' }"
        @click="selectedWorkflow = 'advanced'">
        <div
          class="radio"
          :class="{ 'radio-checked': selectedWorkflow === 'advanced' }" />
        <div class="option-copy">
          <div class="option-title-row">
            <span class="option-title">Advanced Workflow</span
            ><span class="badge">Recommended</span>
          </div>
          <p class="option-subtitle">Best for high-volume outreach</p>
          <div class="option-points">
            <span>Conditional logic</span><span>Multiple paths</span
            ><span>More control</span>
          </div>
        </div>
        <img :src="workflowCard" alt="" class="workflow-illustration" />
      </button>

      <button
        type="button"
        class="workflow-option"
        :class="{ selected: selectedWorkflow === 'standard' }"
        @click="selectedWorkflow = 'standard'">
        <div
          class="radio"
          :class="{ 'radio-checked': selectedWorkflow === 'standard' }" />
        <div class="option-copy">
          <div class="option-title">Standard Workflow</div>
          <p class="option-subtitle">Best for beginners</p>
          <div class="option-points">
            <span>Linear steps</span><span>No conditions</span
            ><span>Easy Setup</span>
          </div>
        </div>
        <img :src="workflowCards" alt="" class="workflow-illustration" />
      </button>

      <div class="workflow-actions">
        <v-btn class="btn-close" variant="flat" @click="close">Close</v-btn>
        <v-btn class="btn-next" variant="flat" @click="onNext">Next</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped>
:global(.workflow-dialog) {
  border-radius: 6px;
}
.workflow-modal {
  position: relative;
  width: 643px;
  height: 471px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(44, 63, 88, 0.35);
  padding: 98px 31px 18px;
}
.workflow-header {
  position: absolute;
  inset: 0 0 auto;
  height: 70px;
  background: #f8f8f8;
  border-radius: 5px 5px 0 0;
  padding: 12px 22px 12px 28px;
  display: flex;
  justify-content: space-between;
}
.workflow-title {
  margin: 0;
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  color: #5e5873;
}
.workflow-subtitle {
  margin: 3px 0 0;
  font-size: 14px;
  line-height: 21px;
  color: #5e5873;
}
.workflow-option {
  width: 582px;
  height: 137px;
  border: 1px solid #ebe9f1;
  border-radius: 8px;
  background: #fff;
  display: flex;
  gap: 14px;
  padding: 24px 16px 0 12px;
  text-align: left;
}
.workflow-option + .workflow-option {
  margin-top: 22px;
}
.workflow-option.selected {
  background: #f6f8ff;
  border-color: #cfdafe;
}
.radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #d8d6de;
  background: #fff;
  margin-top: 3px;
}
.radio-checked {
  border: 6px solid #3666ee;
}
.option-copy {
  flex: 1;
}
.option-title-row {
  display: flex;
  align-items: center;
  gap: 17px;
}
.option-title {
  font-size: 14px;
  line-height: 21px;
  font-weight: 700;
  color: #5e5873;
}
.badge {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 1px 9px;
  border-radius: 17px;
  background: rgba(40, 199, 111, 0.12);
  color: #28c76f;
  font-size: 12px;
  font-weight: 500;
}
.option-subtitle {
  margin: 4px 0 10px;
  font-size: 14px;
  line-height: 21px;
  color: #5e5873;
}
.option-points {
  display: flex;
  gap: 16px;
  color: #5e5873;
  font-size: 14px;
  line-height: 21px;
}
.option-points span::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  border-radius: 50%;
  background: #b1b1b1;
}
.workflow-illustration {
  width: 82px;
  height: 83px;
  object-fit: contain;
  margin-top: 2px;
}
.workflow-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
.btn-close {
  width: 85px;
  height: 37px;
  background: #e8e8e8;
  border-radius: 5px;
  color: #9692a4;
  text-transform: none;
  letter-spacing: 0.4px;
}
.btn-next {
  width: 81px;
  height: 37px;
  background: linear-gradient(239.27deg, #8ba6ff -27.06%, #3762ee 83.4%);
  border-radius: 5px;
  color: #fff;
  text-transform: none;
  letter-spacing: 0.4px;
}
</style>
