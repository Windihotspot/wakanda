<script lang="ts">
import { defineComponent, ref } from 'vue'
import sidebarItems from './sidebarItem'
import LogoDark from '../logo/LogoDark.vue'
export default defineComponent({
  components: {
    LogoDark
  },
  setup() {
    const sidebarMenu = ref(sidebarItems)

    return {
      sidebarMenu
    }
  }
})
</script>

<template>
  <div class="side-bar">
    <!-- Logo part -->
    <div class="logo">
      <img src="../sidebar/side-image/Top form logo.jpg" alt="">
    </div>
   
    <!-- Navigation -->
    <div class="scrollnavbar">
      <v-list class="pa-4" color="transparent">
  <!-- Menu Loop -->
  <template v-for="(item, i) in sidebarMenu" :key="i">
    <!-- Single Item -->
    <v-list-item
      :to="item.to"
      class="mb-4 pr-4 custom-btn no-uppercase"
      size="large"
      rounded="lg"
      router
      block
      active-class="custom-active"  
      
    >
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
.custom-btn {
  text-align: left;
  justify-content: flex-start;
}
.custom-btn .v-icon {
  margin-right: 8px;
  color: #1e1e1e;
}
.custom-btn .menu-item {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
}
.v-btn.router-link-active {
  color: #1e1e1e !important;
}
.v-btn.router-link-active .menu-item {
  color: #1e1e1e !important;
}
.v-btn.router-link-active .v-icon {
  color: #1e1e1e !important;
}
/* Active State */
.custom-active {
  color: #2dd385 !important; /* Customize active color */
}

.custom-active .menu-item {
  color: #4caf50 !important;
}

.custom-active .v-icon {
  color: #4caf50 !important;
}
</style>
