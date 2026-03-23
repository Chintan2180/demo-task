<template>
  <div class="builder-header">
    <span class="crumb-link">Campaign</span>
    <v-icon size="16" color="#A8A8B3">mdi-chevron-right</v-icon>
    <span class="crumb-current">Advance Campaign</span>
  </div>
</template>

<style scoped>
.builder-header {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid #ebe9f1;
  border-radius: 6px;
  background: #fff;
}

.crumb-link {
  font-size: 14px;
  line-height: 21px;
  color: #3666ee;
}

.crumb-current {
  font-size: 14px;
  line-height: 21px;
  color: #4b465c;
}
</style>
