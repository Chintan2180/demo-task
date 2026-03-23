<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  uploadedFileName?: string | null
}>()

const emit = defineEmits<{
  (e: 'file-selected', file: File): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)

const acceptedMimeTypes = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

const isAcceptedFile = (file: File) => {
  const lowerName = file.name.toLowerCase()
  return (
    acceptedMimeTypes.includes(file.type) ||
    lowerName.endsWith('.csv') ||
    lowerName.endsWith('.xls') ||
    lowerName.endsWith('.xlsx')
  )
}

const openFilePicker = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return
  if (!isAcceptedFile(file)) {
    input.value = ''
    return
  }

  emit('file-selected', file)
  input.value = ''
}

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files?.[0]

  if (!file) return
  if (!isAcceptedFile(file)) return

  emit('file-selected', file)
}
</script>

<template>
  <section class="builder-section">
    <header class="section-header">
      <div class="section-title-row">
        <div class="timeline-dot" />
        <span class="section-title">Upload CSV File</span>
        <span class="step-badge">Step 1 of 2</span>
      </div>
      <v-icon size="18" color="#6E6B7B">mdi-chevron-up</v-icon>
    </header>

    <div class="section-body">
      <button
        type="button"
        class="upload-box"
        @click="openFilePicker"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <v-icon size="22" color="#5d87ff">mdi-tray-arrow-up</v-icon>
        <div class="upload-title">
          {{ uploadedFileName ? uploadedFileName : 'Drag a File or click to browse' }}
        </div>
        <div class="upload-copy">File with up to 100 rows works best</div>
      </button>

      <input
        ref="fileInput"
        type="file"
        accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        class="hidden-input"
        @change="handleFileChange"
      />

      <button type="button" class="sample-link">
        <v-icon size="19" color="#3666EE">mdi-cloud-download-outline</v-icon>
        <span>Download a sample file</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.builder-section {
  position: relative;
  margin-top: 16px;
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

.section-title {
  font-size: 14px;
  color: #444050;
}

.step-badge {
  font-size: 11px;
  color: #8b8c9f;
}

.section-body {
  margin-top: 12px;
  margin-left: 2px;
  padding: 12px 16px;
  border-left: 2px solid #edf0fb;
}

.upload-box {
  min-height: 159px;
  width: 100%;
  border: 1px dashed #3666ee;
  border-radius: 4px;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  background: #f8faff;
  padding: 20px;
  text-align: center;
}

.upload-box :deep(.v-icon) {
  width: 29px;
  height: 29px;
  border-radius: 5.52381px;
  background: #eaefff;
  display: grid;
  place-items: center;
}

.upload-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #3666ee;
}

.upload-copy {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 140%;
  color: #5e5873;
}

.sample-link {
  margin-top: 10px;
  border: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #5e5873;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 140%;
  padding: 0;
}

.hidden-input {
  display: none;
}
</style>
