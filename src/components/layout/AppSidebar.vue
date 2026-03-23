<script setup lang="ts">
import userAvatar from '../../assets/user-avatar.png'

defineEmits<{
  (e: 'close-sidebar'): void
}>()
</script>

<template>
  <div class="sidebar-shell">
    <div>
      <div class="brand-row">
        <div class="brand-mark">
          <v-icon size="16" color="primary">mdi-rocket-launch-outline</v-icon>
        </div>
        <span class="brand-title">Frontend Task</span>
        <v-btn
          icon
          variant="text"
          size="x-small"
          class="brand-action"
          @click="$emit('close-sidebar')"
        >
          <svg width="4" height="6" viewBox="0 0 4 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M0.5625 0.5625L1.39364 1.22151C2.33955 1.97153 2.8125 2.34653 2.8125 2.8125C2.8125 3.27847 2.33955 3.65347 1.39364 4.40347L0.5625 5.0625"
              stroke="#5E5873"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </v-btn>
      </div>

      <v-list density="compact" nav class="menu-list">
        <v-list-item
          active
          rounded="sm"
          prepend-icon="mdi-bullhorn-outline"
          title="Campaign"
          class="menu-item-active"
        />
      </v-list>
    </div>

    <div class="sidebar-footer">
      <v-card rounded="lg" class="profile-card" elevation="0">
        <div class="profile-row">
          <v-avatar size="42">
            <v-img :src="userAvatar" alt="John Doe" cover />
          </v-avatar>
          <div class="profile-copy">
            <div class="profile-name">John Doe</div>
            <div class="profile-role">Admin</div>
          </div>
          <v-btn icon variant="text" size="small" class="logout-btn">
            <v-icon size="16">mdi-logout</v-icon>
          </v-btn>
        </div>

        <div class="email-label">Email</div>
        <div class="email-value">johndoe@gmail.com</div>
      </v-card>

      <div class="theme-toggle">
        <button type="button" class="theme-pill active">
          <v-icon size="14">mdi-white-balance-sunny</v-icon>
          <span>Light</span>
        </button>
        <button type="button" class="theme-pill">
          <v-icon size="14">mdi-weather-night</v-icon>
          <span>Dark</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 12px 16px;
  background: #ffffff;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.brand-mark {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: grid;
  place-items: center;
}

.brand-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #1e2433;
}

.brand-action {
  color: #7f8798;
}

.menu-list {
  padding: 0;
}

.menu-item-active {
  min-height: 40px;
  background: linear-gradient(239.27deg, #8ba6ff -27.06%, #3762ee 83.4%);
  color: #ffffff;
}

.menu-item-active :deep(.v-list-item-title),
.menu-item-active :deep(.v-icon) {
  color: #ffffff;
}

.sidebar-footer {
  display: grid;
  gap: 10px;
}

.profile-card {
  padding: 12px;
  background: #f5f7fb;
  border: 1px solid #edf0f7;
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-copy {
  min-width: 0;
}

.profile-name {
  font-size: 13px;
  font-weight: 600;
  color: #212734;
}

.profile-role {
  font-size: 11px;
  color: #8a91a5;
}

.logout-btn {
  margin-left: auto;
  color: #58627a;
}

.email-label {
  margin-top: 10px;
  font-size: 11px;
  color: #9aa1b3;
}

.email-value {
  font-size: 13px;
  color: #4b5568;
  word-break: break-word;
}

.theme-toggle {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 4px;
  border-radius: 999px;
  background: #f5f7fb;
  border: 1px solid #edf0f7;
}

.theme-pill {
  border: 0;
  background: transparent;
  border-radius: 999px;
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #6f7890;
  font-size: 12px;
}

.theme-pill.active {
  background: #ffffff;
  color: #1f2533;
}
</style>
