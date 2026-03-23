<script setup lang="ts">
defineProps<{
  uploadedFileName?: string | null
}>()

const emit = defineEmits<{
  (e: 'remove-file'): void
}>()

const contactFields = [
  'Full name',
  'First name',
  'Last name',
  'Company Name',
  'Position',
  'Headline',
]

const csvFields = [
  { label: 'Full name', count: 35, icon: 'mdi-account-circle-outline' },
  { label: 'First name', count: 3, icon: 'mdi-account-circle-outline' },
  { label: 'Last name', count: 12, icon: 'mdi-account-circle-outline' },
  { label: 'Company Name', count: 36, icon: 'mdi-domain' },
  { label: 'Position', count: 25, icon: 'mdi-briefcase-outline' },
  { label: 'Headline', count: 25, icon: 'mdi-card-text-outline' },
]

const unmappedFields = [
  { label: 'Location', count: 3 },
  { label: 'Industry', count: 3 },
  { label: 'Notes', count: 9 },
]
</script>

<template>
  <section class="builder-section">
    <header class="section-header">
      <div class="section-title-row">
        <div class="timeline-dot done" />
        <span class="section-title">Upload CSV file Selected</span>
        <span class="step-badge">Step 1 of 2</span>
      </div>
      <v-icon size="18" color="#6E6B7B">mdi-chevron-up</v-icon>
    </header>

    <header class="section-header second">
      <div class="section-title-row">
        <div class="timeline-dot done" />
        <span class="section-title">Upload CSV File</span>
        <span class="step-badge">Step 1 of 2</span>
      </div>
      <v-icon size="18" color="#6E6B7B">mdi-chevron-up</v-icon>
    </header>

    <div class="mapping-card">
      <div class="mapping-head">
        <div>
          <h3>Map Properties</h3>
          <div class="mapping-note">
            <v-icon size="18" color="#3666EE">mdi-check-bold</v-icon>
            <span>Make sure file includes contact name and phone number</span>
          </div>
        </div>

        <v-btn icon variant="text" size="small" class="delete-btn" @click="emit('remove-file')">
          <v-icon size="20" color="#EA5455">mdi-delete-outline</v-icon>
        </v-btn>
      </div>

      <div class="divider" />

      <div class="mapping-grid">
        <div class="mapping-left">
          <div class="mapping-columns-head">
            <span>Contact Field</span>
            <span>CSV Column</span>
          </div>

          <div
            v-for="(field, index) in contactFields"
            :key="field"
            class="mapping-row"
          >
            <div class="map-pill source-pill">
              <div class="pill-main">
                <v-icon size="16" color="#28C76F">mdi-table-column</v-icon>
                <span>{{ field }}</span>
              </div>
            </div>

            <div class="map-pill target-pill">
              <div class="pill-main">
                <v-icon size="16" color="#6B7280">{{ csvFields[index]?.icon }}</v-icon>
                <span>{{ csvFields[index]?.label }}</span>
              </div>
              <span class="pill-count">({{ csvFields[index]?.count }})</span>
            </div>
          </div>
        </div>

        <div class="mapping-right">
          <div class="right-head">
            <span>Unmapped Works</span>
            <span class="right-divider" />
          </div>

          <div class="search-shell">
            <v-icon size="12" color="#BABFC7">mdi-magnify</v-icon>
            <input type="text" placeholder="Search" class="search-input" />
          </div>

          <div
            v-for="field in unmappedFields"
            :key="field.label"
            class="unmapped-pill"
          >
            <div class="pill-main">
              <v-icon size="16" color="#334155">mdi-format-list-bulleted</v-icon>
              <span>{{ field.label }} ({{ field.count }})</span>
            </div>
            <span class="pill-count">({{ field.count }})</span>
          </div>

          <button type="button" class="clear-link">Clear All Matched</button>
        </div>
      </div>
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

.second {
  margin-top: 10px;
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

.timeline-dot.done {
  background: #28c76f;
  border-color: #28c76f;
}

.section-title {
  font-size: 14px;
  color: #444050;
}

.step-badge {
  font-size: 11px;
  color: #8b8c9f;
}

.mapping-card {
  margin-top: 12px;
  margin-left: 2px;
  min-height: 551px;
  border: 1px solid #ebe9f1;
  border-radius: 5px;
  background: #fff;
}

.mapping-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 16px 14px;
}

.mapping-head h3 {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 140%;
  color: #5e5873;
}

.mapping-note {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 3px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 140%;
  color: #5e5873;
}

.delete-btn {
  margin-top: 2px;
}

.divider {
  border-top: 1px solid #ebe9f1;
}

.mapping-grid {
  display: grid;
  grid-template-columns: 592px 323px;
  gap: 24px;
  padding: 20px 10px 20px 10px;
}

.mapping-left,
.mapping-right {
  min-height: 392px;
  border-radius: 5px;
}

.mapping-columns-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
  padding: 0 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: #444050;
}

.mapping-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 8px;
}

.map-pill {
  min-height: 38px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.source-pill {
  background: #fff;
}

.target-pill {
  background: #f6f6f6;
}

.pill-main {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: #444050;
}

.pill-count {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: #444050;
}

.mapping-right {
  border: 1px solid #ebe9f1;
  padding: 16px;
}

.right-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebe9f1;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: #444050;
}

.right-divider {
  width: 1px;
  height: 17px;
  background: rgba(0, 0, 0, 0.09);
}

.search-shell {
  margin-top: 16px;
  min-height: 30px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}

.search-input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  line-height: 12px;
  color: #444050;
}

.search-input::placeholder {
  color: #b9b9c3;
}

.unmapped-pill {
  margin-top: 8px;
  min-height: 38px;
  border: 1px solid #d0dcff;
  border-radius: 5px;
  background: #f8faff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.clear-link {
  margin-top: 10px;
  margin-left: auto;
  display: block;
  border: 0;
  background: transparent;
  color: #3666ee;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 17px;
}

@media (max-width: 1200px) {
  .mapping-grid {
    grid-template-columns: 1fr;
  }

  .mapping-left,
  .mapping-right {
    min-height: auto;
  }
}
</style>
