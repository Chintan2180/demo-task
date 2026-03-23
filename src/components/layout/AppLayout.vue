<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'

defineProps<{
  breadcrumbItems?: string[]
}>()

const emit = defineEmits<{
  (e: 'breadcrumb-click', item: string, index: number): void
}>()

const drawer = ref(true)
const { mdAndDown } = useDisplay()
</script>

<template>
  <div class="layout-root">
    <v-navigation-drawer
      v-if="drawer || mdAndDown"
      v-model="drawer"
      :temporary="mdAndDown"
      :permanent="!mdAndDown"
      width="260"
      border="none"
      class="sidebar"
    >
      <AppSidebar @close-sidebar="drawer = false" />
    </v-navigation-drawer>

    <v-main :class="['main-shell', { 'main-shell-collapsed': !drawer && !mdAndDown }]">
      <AppTopbar
        show-menu-button
        :breadcrumb-items="breadcrumbItems"
        @toggle-menu="drawer = !drawer"
        @breadcrumb-click="(item, index) => emit('breadcrumb-click', item, index)"
      />

      <div class="content-wrap">
        <slot />
      </div>
    </v-main>
  </div>
</template>

<style scoped>
.layout-root {
  position: relative;
  min-height: 100vh;
  padding: 12px;
  background: #f4f6fb;
}

.sidebar {
  position: absolute;
  top: 12px;
  left: 12px;
  height: calc(100% - 24px);
  flex-shrink: 0;
  border: 1px solid #e7ebf3;
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.04);
}

.main-shell {
  margin-left: 272px;
  min-width: 0;
  padding: 0;
  background: #f4f6fb;
  transition: margin-left 0.25s ease;
}

.main-shell-collapsed {
  margin-left: 0;
}

.content-wrap {
  min-height: calc(100vh - 98px);
  padding-top: 12px;
}

@media (max-width: 959px) {
  .layout-root {
    padding: 12px;
  }

  .sidebar {
    position: static;
    top: auto;
    left: auto;
    height: auto;
  }

  .main-shell {
    margin-left: 0;
  }
}
</style>
