<script setup lang="ts">
import type { ImportMethod } from './campaignTypes'

const props = defineProps<{
  selectedMethod: ImportMethod
}>()

const emit = defineEmits<{
  (e: 'select', value: Exclude<ImportMethod, null>): void
}>()

const methods = [
  {
    key: 'linkedin',
    icon: 'mdi-linkedin',
    title: 'LinkedIn Search',
    description: '(Basic, Sales Nav, Post, Group or Event URL)',
  },
  {
    key: 'csv',
    icon: 'mdi-calendar-blank-outline',
    title: 'Upload CSV File',
    description: 'Upload LinkedIn profiles via CSV. Download Sample',
  },
  {
    key: 'lookalike',
    icon: 'mdi-account-multiple-outline',
    title: 'Lookalike Audience',
    description: 'Use Lead Finder to find audience.',
  },
  {
    key: 'webhook',
    icon: 'mdi-link-variant',
    title: 'Inbound Webhook',
    description: 'Sync leads from zapier, n8n make in real time',
  },
] as const
</script>

<template>
  <section class="builder-section">
    <header class="section-header">
      <div class="section-title-row">
        <div class="timeline-dot" :class="{ active: !!props.selectedMethod }" />
        <span class="section-title">Choose Import Method</span>
      </div>

      <v-icon size="18" color="#6E6B7B">mdi-chevron-up</v-icon>
    </header>

    <div class="cards-rail">
      <button
        v-for="method in methods"
        :key="method.key"
        type="button"
        class="method-card"
        :class="{ selected: props.selectedMethod === method.key }"
        @click="emit('select', method.key)"
      >
        <div class="method-card-top">
          <v-icon size="17" color="#3666EE">{{ method.icon }}</v-icon>
          <v-icon
            v-if="props.selectedMethod === method.key"
            size="16"
            color="#3666EE"
          >
            mdi-check-circle
          </v-icon>
        </div>

        <h4>{{ method.title }}</h4>
        <p>{{ method.description }}</p>
      </button>
    </div>
  </section>
</template>

<style scoped>
.builder-section {
  position: relative;
  padding-left: 14px;
}

.section-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 52px;
  padding: 0 16px;
  border: 1px solid #ebe9f1;
  border-radius: 5px;
  background: #fff;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.timeline-dot {
  position: absolute;
  left: -21px;
  top: 18px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid #3666ee;
  background: #fff;
}

.timeline-dot.active {
  background: #28c76f;
  border-color: #28c76f;
}

.section-title {
  font-size: 14px;
  line-height: 21px;
  color: #444050;
}

.cards-rail {
  margin-top: 12px;
  margin-left: 2px;
  padding-left: 16px;
  border-left: 2px solid #edf0fb;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.method-card {
  min-height: 136px;
  border: 1px solid #ebe9f1;
  border-radius: 6px;
  background: #f9fbff;
  padding: 14px 12px;
  text-align: left;
}

.method-card.selected {
  border-color: #6f8fff;
  box-shadow: inset 0 0 0 1px #6f8fff;
  background: #fcfdff;
}

.method-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.method-card h4 {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: #4b465c;
}

.method-card p {
  margin: 8px 0 0;
  font-size: 11px;
  line-height: 16px;
  color: #6e6b7b;
}

@media (max-width: 1100px) {
  .cards-rail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
