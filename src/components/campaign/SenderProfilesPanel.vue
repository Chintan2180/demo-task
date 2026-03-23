<template>
  <section class="sender-section">
    <div class="profile-tabs">
      <button type="button" class="mini-tab mini-tab-left active">LinkedIn Profile</button>
      <button type="button" class="mini-tab mini-tab-right">Email Accounts</button>
    </div>

    <div class="profiles-card">
      <div class="card-head">
        <div>
          <div class="card-title">
            <v-icon size="24" color="#3666EE">mdi-linkedin</v-icon>
            <span>LinkedIn Profile</span>
          </div>
          <p>Pick which LinkedIn profiles you want to use for this campaign.</p>
        </div>

        <v-btn color="primary" size="small" class="add-account-btn">
          <v-icon size="14" start>mdi-plus</v-icon>
          Add Account
        </v-btn>
      </div>

      <v-table class="sender-table" theme="light">
        <template #top>
          <div class="controls-row">
            <div class="show-row">
              <span>Show</span>
              <v-select
                v-model="showCount"
                :items="showOptions"
                variant="outlined"
                density="compact"
                hide-details
                class="show-select" />
            </div>

            <v-text-field
              v-model="searchQuery"
              placeholder="Search"
              variant="outlined"
              density="compact"
              hide-details
              prepend-inner-icon="mdi-magnify"
              class="search-field" />
          </div>
        </template>

        <thead>
          <tr>
            <th class="checkbox-cell">
              <v-checkbox-btn v-model="allSelected" />
            </th>
            <th>Name</th>
            <th>Health</th>
            <th>Daily Limits</th>
            <th>Account Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in visibleProfiles" :key="item.id">
            <td class="checkbox-cell">
              <v-checkbox-btn v-model="selectedIds" :value="item.id" />
            </td>
            <td>
              <div class="name-cell">
                <v-avatar size="31">
                  <v-img :src="item.avatar" :alt="item.name" cover />
                </v-avatar>
                <div>
                  <div class="person-name">{{ item.name }}</div>
                  <div class="person-copy">
                    {{ item.connections }} connections
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="health-pill">{{ item.health }}</div>
            </td>
            <td>
              <div class="limit-pill">
                Invites: {{ item.dailyInvites }} / day
              </div>
            </td>
            <td>
              <div class="type-cell">
                <v-icon size="24" color="#F5B400">mdi-linkedin</v-icon>
                <span>{{ item.accountType }}</span>
              </div>
            </td>
            <td>
              <div class="status-pill">{{ item.status }}</div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type SenderProfile = {
  id: number;
  name: string;
  connections: number;
  health: number;
  dailyInvites: number;
  accountType: string;
  status: string;
  avatar: string;
};

const showOptions = [10, 25, 50];
const showCount = ref(10);
const searchQuery = ref("");

const profiles = ref<SenderProfile[]>([
  {
    id: 1,
    name: "Edgar Jones",
    connections: 1250,
    health: 72,
    dailyInvites: 40,
    accountType: "Premium",
    status: "Connected",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop",
  },
]);

const selectedIds = ref<number[]>([]);

const filteredProfiles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return profiles.value;

  return profiles.value.filter((item) =>
    [item.name, item.accountType, item.status]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
});

const visibleProfiles = computed(() =>
  filteredProfiles.value.slice(0, Number(showCount.value)),
);

const allSelected = computed({
  get: () =>
    visibleProfiles.value.length > 0 &&
    visibleProfiles.value.every((item) => selectedIds.value.includes(item.id)),
  set: (value: boolean) => {
    if (value) {
      selectedIds.value = visibleProfiles.value.map((item) => item.id);
      return;
    }
    selectedIds.value = [];
  },
});
</script>

<style scoped>
.sender-section {
  margin-top: 18px;
}

.profile-tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 298px;
  height: 37px;
  padding: 0;
}

.mini-tab {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 11px 16px;
  gap: 10px;
  height: 38px;
  border: 1px solid #3666ee;
  background: #fff;
  color: #3666ee;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0.4px;
  text-align: center;
}

.mini-tab-left {
  width: 150px;
  border-radius: 5px 0 0 5px;
}

.mini-tab-right {
  width: 148px;
  border-radius: 0 5px 5px 0;
}

.mini-tab.active {
  background: #cfdafe;
}

.profiles-card {
  margin-top: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
}

.card-head {
  padding: 12px 14px 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #4b465c;
}

.card-head p {
  margin: 4px 0 0;
  font-size: 11px;
  color: #6e6b7b;
}

.add-account-btn {
  text-transform: none;
}

.controls-row {
  padding: 10px 28px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ebe9f1;
  background: #fff;
}

.show-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #6e6b7b;
}

.show-select {
  max-width: 90px;
}

.sender-table {
  border-top: 1px solid #ebe9f1;
  background: #fff;
}

.sender-table :deep(.v-table__top) {
  background: #fff;
}

.sender-table :deep(.v-table__wrapper) {
  background: #fff;
}

.sender-table :deep(table) {
  width: 100%;
  background: #fff;
}

.sender-table :deep(thead th) {
  height: 40px;
  background: #f3f2f7;
  color: #5e5873;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 1px solid #ebe9f1;
}

.sender-table :deep(tbody td) {
  height: 64px;
  border-bottom: 1px solid #ebe9f1;
  background: #fff;
  color: #444050;
}

.sender-table :deep(tbody tr) {
  background: #fff;
}

.checkbox-cell {
  display: flex;
  justify-content: center;
  width: 48px;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.person-name {
  font-size: 12px;
  color: #4b465c;
}

.person-copy {
  font-size: 12px;
  line-height: 18px;
  color: #6d6b77;
}

.health-pill {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 5px solid #ff9f43;
  display: grid;
  place-items: center;
  font-size: 12px;
  color: #4b465c;
}

.limit-pill {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #d0d0d0;
  font-size: 14px;
  color: #4b465c;
}

.type-cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #4b465c;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  padding: 1px 9px;
  border-radius: 999px;
  background: #28c76f;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.sender-table :deep(.v-field) {
  border-radius: 5px;
}

.sender-table :deep(.v-field__input) {
  min-height: 30px;
  font-size: 10px;
}

.controls-row :deep(.search-field) {
  width: 150px !important;
  max-width: 150px !important;
}

.controls-row :deep(.search-field .v-input__control) {
  min-height: 24px !important;
}

.controls-row :deep(.search-field .v-field) {
  min-height: 24px !important;
  height: 24px !important;
  border-radius: 5px;
}

.controls-row :deep(.search-field .v-field__field) {
  min-height: 24px !important;
}

.controls-row :deep(.search-field .v-field__input) {
  min-height: 24px !important;
  height: 24px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 10px;
}

.controls-row :deep(.search-field .v-field__prepend-inner) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  align-items: center;
}

.controls-row :deep(.search-field .v-field__prepend-inner .v-icon) {
  font-size: 12px;
  color: #babfc7;
}

.sender-table
  :deep(
    .v-input--density-compact .v-field--variant-outlined .v-field__outline
  ) {
  --v-field-border-opacity: 1;
  color: #d8d6de;
}
</style>
