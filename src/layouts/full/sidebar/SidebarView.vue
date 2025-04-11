<script setup>
import { ref } from 'vue'
import sidebarItems from './sidebarItem'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
// Function to check if the current route is active
const isActive = (path) => {
  return route.path === path
}


const sidebarMenu = ref(sidebarItems)
</script>

<template>
  <div class="side-bar">
    <!-- Logo part -->
    <div class="logo pa-4">
      <!-- Logo -->
      <img src="/src/assets/images/white.png" class="" />
    </div>

    <!-- Navigation -->
    <div class="scrollnavbar">
      <v-list class="pa-4" color="transparent">
        <!-- Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!-- Single Item -->

          <v-list-item  @click="router.push(item.path)" class="mb-4 pr-4 custom-btn no-uppercase" size="small" rounded="lg" block :class="{ 'custom-active': isActive(item.path) }">
            <v-icon left>{{ item.icon }}</v-icon>
            <span class="menu-item ml-4" v-text="item.title"></span>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 50%;
}
.menu-item {
  font-size: 36px;
  text-transform: none;
  color: #1e1e1e;
}

.custom-btn:hover {
  background-color: #e8f0fe;
}

.custom-btn {
  text-align: left;
  justify-content: flex-start;
  transition: background-color 0.2s ease;
}
.custom-btn .v-icon {
  margin-right: 8px;
  color: #1e1e1e;
}
.custom-btn .menu-item {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
}
.custom-link {
  text-decoration: none; /* Remove underline from Link */
}

.custom-active {
  color: #1f5aa3 !important; /* Active state color */
  background-color: rgba(0, 0, 255, 0.1); /* Light blue background */
}

.custom-active .menu-item {
  color: #1f5aa3!important;
}

.custom-active .v-icon {
  color: #1f5aa3!important;
}
</style>
