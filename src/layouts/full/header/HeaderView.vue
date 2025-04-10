<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const token = computed(() => authStore.token)
const tenantId = computed(() => authStore.tenant_id)
import { useRouter } from 'vue-router'
const router = useRouter()

// Reactive variable to handle loading state
const isLoading = ref(false)
const errorMessage = ref(null)

// Logout function
const logout = async () => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
  isLoading.value = true
  errorMessage.value = null

  try {
    const response = await axios.post(
      `https://dev02201.getjupita.com/api/${tenantId}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    // Handle the successful logout
    console.log('Logged out successfully:', response.data)

    // Redirect to login page or any other page
    router.push('/') 
  } catch (error) {
    // Handle errors
    errorMessage.value = error.response?.data?.message || error.message
    console.error('Logout failed:', errorMessage.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="header items-center px-4 py-2 shadow-md bg-white">
    <!-- Icons (Right) -->
    <div class="space-x-4">
      <!-- Notifications Icon -->
      <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <i class="fa-regular fa-bell fa-xl"></i>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link class="text-gray-700 text-sm hover:text-blue-500 flex">
            <div class="flex items-center gap-2">
              <v-list-item-title>You analysed a statement 3 hours ago</v-list-item-title>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- User Profile -->
      <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="p-0" elevation="0" color="transparent" plain :ripple="false">
            <v-avatar size="32">
              <img src="@/assets/images/users/black-user.jpg" alt="User Avatar" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout" link class="text-gray-700 hover:text-red-500">
            <div class="flex items-center gap-2">
              <i class="fas fa-sign-out-alt text-gray-500 hover:text-red-500"></i>
              <v-list-item-title>Logout</v-list-item-title>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons-container {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}

.search {
  flex-grow: 0;
}
</style>
