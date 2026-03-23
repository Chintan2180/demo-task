<template>
  <div class="toolbar">
    <v-select
      model-value="All"
      :items="['All']"
      density="compact"
      variant="outlined"
      hide-details
      class="toolbar-filter"
    />

    <v-text-field
      model-value=""
      density="compact"
      variant="outlined"
      hide-details
      prepend-inner-icon="mdi-magnify"
      placeholder="Search"
      class="toolbar-search"
    />
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toolbar-filter {
  max-width: 108px;
}

.toolbar-search {
  max-width: 186px;
}
</style>
