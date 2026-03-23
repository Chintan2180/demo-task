<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue: boolean }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select-list', value: string): void
}>()

const modalMode = ref<'empty' | 'select'>('empty')
const selectedList = ref('founder')

watch(
  () => props.modelValue,
  (value) => {
    if (value) modalMode.value = 'empty'
  },
)

const onSelectList = () => {
  emit('select-list', selectedList.value)
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    width="702"
    scrim="rgba(15, 23, 42, 0.35)"
    @update:model-value="emit('update:modelValue', !!$event)"
  >
    <div class="lookalike-modal">
      <div class="modal-head">
        <div>
          <h3>Lookalikes</h3>
          <p>Select a lookalike list for this campaign</p>
        </div>
        <v-btn icon variant="text" size="small" class="close-btn" @click="emit('update:modelValue', false)">
          <v-icon size="20" color="#64748B">mdi-close-circle-outline</v-icon>
        </v-btn>
      </div>

      <div v-if="modalMode === 'empty'" class="modal-empty">
        <div class="modal-copy">
          <h4>You don’t have any leads</h4>
          <p>Create a lead list to start running campaigns</p>
        </div>
        <v-btn color="primary" size="small" class="create-btn" @click="modalMode = 'select'">Create a List</v-btn>
      </div>

      <div v-else class="select-mode">
        <button
          type="button"
          class="list-option"
          :class="{ selected: selectedList === 'founder' }"
          @click="selectedList = 'founder'"
        >
          <div class="list-main">
            <v-icon size="16" color="#64748B">mdi-format-list-bulleted</v-icon>
            <span>Founder</span>
            <small>1000+ Users in the List</small>
          </div>
          <v-icon size="16" color="#3762EE">{{ selectedList === 'founder' ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}</v-icon>
        </button>

        <button
          type="button"
          class="list-option"
          :class="{ selected: selectedList === 'tech' }"
          @click="selectedList = 'tech'"
        >
          <div class="list-main">
            <v-icon size="16" color="#64748B">mdi-format-list-bulleted</v-icon>
            <span>Tech Profiles</span>
            <small>1000+ Users in the List</small>
          </div>
          <v-icon size="16" color="#3762EE">{{ selectedList === 'tech' ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}</v-icon>
        </button>

        <button type="button" class="add-new-link">Add New</button>

        <div class="select-actions">
          <v-btn variant="flat" class="cancel-btn" @click="emit('update:modelValue', false)">Cancel</v-btn>
          <v-btn color="primary" variant="flat" class="select-btn" @click="onSelectList">Select List</v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped>
.lookalike-modal {
  width: 702px;
  min-height: 557px;
  border-radius: 12px;
  background: #fff;
}

.modal-head {
  min-height: 88px;
  padding: 14px 25px;
  background: #f8f8f8;
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-head h3 {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;
  color: #5e5873;
}

.modal-head p {
  margin: 3px 0 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: #444050;
}

.modal-empty {
  min-height: 469px;
  display: grid;
  place-content: center;
  justify-items: center;
  text-align: center;
  gap: 24px;
}

.modal-copy {
  display: grid;
  gap: 8px;
}

.modal-empty h4 {
  margin: 0;
  width: 308px;
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;
  color: #5e5873;
}

.modal-empty p {
  margin: 0;
  width: 308px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #5e5873;
}

.create-btn {
  width: 137px;
  height: 37px;
  border-radius: 5px;
  text-transform: none;
  letter-spacing: 0.4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.close-btn {
  margin-left: 16px;
}

.select-mode {
  min-height: 469px;
  padding: 26px 14px 14px;
}

.list-option {
  width: 100%;
  min-height: 34px;
  border: 1px solid #d0dcff;
  border-radius: 4px;
  background: #f8faff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  text-align: left;
}

.list-option + .list-option {
  margin-top: 10px;
}

.list-main {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: #444050;
}

.list-main small {
  color: #8b8c9f;
  font-size: 10px;
}

.list-option.selected {
  border-color: #8ba6ff;
}

.add-new-link {
  display: block;
  margin: 12px 0 0 auto;
  border: 0;
  background: transparent;
  color: #8ba6ff;
  font-size: 11px;
}

.select-actions {
  margin-top: 34px;
  padding-top: 10px;
  border-top: 1px solid #f0f0f4;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.cancel-btn {
  min-width: 72px;
  text-transform: none;
  background: #e8e8e8;
  color: #9692a4;
}

.select-btn {
  min-width: 92px;
  text-transform: none;
}
</style>
