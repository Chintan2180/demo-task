<script setup lang="ts">
import emptyCampaign from "../../assets/empty-campaign.svg";
import workflowCard from "../../assets/workflow-card.svg";

const emit = defineEmits<{ (e: "new-campaign"): void }>();
</script>

<template>
  <div>
    <div class="toolbar">
      <v-select
        model-value="All"
        :items="['All']"
        density="compact"
        variant="outlined"
        hide-details
        class="filter" />
      <v-text-field
        model-value=""
        density="compact"
        variant="outlined"
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        class="search" />
    </div>

    <div class="empty-state">
      <img :src="emptyCampaign" alt="No campaigns" class="empty-illustration" />
      <img :src="workflowCard" alt="User avatar illustration" class="workflow-illustration" />
      <v-btn
        color="primary"
        rounded="sm"
        size="small"
        class="mt-6"
        @click="emit('new-campaign')"
        >New Campaign</v-btn
      >
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
}
.filter {
  max-width: 140px;
}
.search {
  max-width: 210px;
}
.empty-state {
  min-height: calc(100vh - 230px);
  display: grid;
  place-content: center;
  justify-items: center;
}
.empty-illustration {
  width: min(354px, 100%);
  height: auto;
}

.workflow-illustration {
  width: min(354px, 100%);
  height: auto;
  margin-top: 8px;
}
</style>
