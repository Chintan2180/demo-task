<script setup lang="ts">
import userAvatar from '../../assets/user-avatar.png'

const props = defineProps<{
  showMenuButton?: boolean
  breadcrumbItems?: string[]
}>()

const emit = defineEmits<{
  (e: 'toggle-menu'): void
  (e: 'breadcrumb-click', item: string, index: number): void
}>()
</script>

<template>
  <div class="topbar-shell">
    <div class="topbar-left">
      <v-btn
        v-if="props.showMenuButton"
        icon
        variant="text"
        size="small"
        class="toggle-btn"
        @click="emit('toggle-menu')"
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

      <div class="crumb">
        <v-icon size="14" color="primary">mdi-home-outline</v-icon>
        <template v-for="(item, index) in props.breadcrumbItems ?? ['Campaign']" :key="`${item}-${index}`">
          <v-icon size="14" color="#A0A7B8">mdi-chevron-right</v-icon>
          <button
            type="button"
            class="crumb-item"
            @click="emit('breadcrumb-click', item, index)"
          >
            {{ item }}
          </button>
        </template>
      </div>
    </div>

    <div class="header-user">
      <div class="header-copy">
        <div class="header-name">John Doe</div>
        <div class="header-role">Admin</div>
      </div>

      <div class="avatar-wrap">
        <v-avatar size="34">
          <v-img :src="userAvatar" alt="John Doe" cover />
        </v-avatar>
        <span class="status-dot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar-shell {
  min-height: 62px;
  padding: 0 25px;
  border: 0;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  overflow: hidden;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.toggle-btn {
  color: #5e5873;
}

.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: #6e6b7b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.crumb-item {
  border: 0;
  background: transparent;
  padding: 0;
  color: inherit;
  font: inherit;
  line-height: inherit;
  cursor: pointer;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.header-copy {
  text-align: right;
  min-width: 0;
}

.header-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: #6e6b7b;
}

.header-role {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: #b1b7c6;
}

.avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.crumb :deep(.v-icon:first-child) {
  color: #3666ee !important;
}

.crumb :deep(.v-icon:nth-child(2)) {
  color: #6e6b7b !important;
}

.status-dot {
  position: absolute;
  right: 0;
  bottom: 1px;
  width: 9px;
  height: 9px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #32c76f;
}

@media (max-width: 960px) {
  .topbar-shell {
    padding: 0 16px;
    gap: 16px;
  }

  .header-name {
    font-size: 13px;
    line-height: 18px;
  }

  .header-role {
    font-size: 11px;
    line-height: 16px;
  }
}

@media (max-width: 600px) {
  .topbar-shell {
    min-height: 56px;
    padding: 8px 12px;
    gap: 12px;
  }

  .crumb {
    font-size: 13px;
    line-height: 18px;
  }

  .header-copy {
    display: none;
  }
}
</style>
