<script setup>
import { ref, onMounted } from 'vue';
import SidebarView from './sidebar/SidebarView.vue';
import HeaderView from './header/HeaderView.vue';

const drawer = ref();
const innerW = window.innerWidth;

onMounted(() => {
  if (innerW < 950) {
    drawer.value = !drawer.value;
  }
});
</script>

<template>
  <v-app>
    <!-- ---------------------------------------------- -->
    <!--- Sidebar -->
    <!-- ---------------------------------------------- -->
    <v-navigation-drawer
      left
      :permanent="$vuetify.display.mdAndUp"
      elevation="10"
      app
      :temporary="$vuetify.display.mdAndDown"
      v-model="drawer"
      expand-on-hover
      class="side-bar"
    >
      <SidebarView />
    </v-navigation-drawer>

    <!-- ---------------------------------------------- -->
    <!--- Header -->
    <!-- ---------------------------------------------- -->
    <v-app-bar app elevation="4">
      <v-btn class="hidden-md-and-up" icon @click="drawer = !drawer">
        <v-icon>fa-solid fa-bars</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <HeaderView />
    </v-app-bar>

    <!-- ---------------------------------------------- -->
    <!--- Page Wrapper -->
    <!-- ---------------------------------------------- -->
    <v-main class="">
      <v-container fluid class="">
        <slot />
      </v-container>
    </v-main>
  </v-app>

  
</template>

<style scoped>
.page-wrapper {
  background-color: #F4F6FA;
}

.settings-icon {
  position: fixed;
  bottom: 16px;
  right: 16px;
  font-size: 36px;
  color: #121621;
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
