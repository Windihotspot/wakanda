<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
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
  <div class="header items-center px-4 py-4 shadow-md bg-white">
    <!-- Icons (Right) -->
    <div class="space-x-4">
      <!-- Notifications Icon -->
      <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn class="min-w-0 w-4 h-4" v-bind="props" icon>
            <i class="fa-regular fa-bell font-light fa-2xl text-blue-400"></i>
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

      <v-chip variant="text" class="rounded-full px-2 py-4 items-center" size="large">
        <v-avatar left size="32">
          <v-img
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            alt="Avatar"
          ></v-img>
        </v-avatar>
        <div class="ml-2 text-left">
          <div class="font-semibold text-sm">John Doe</div>
          <div class="text-xs text-gray-500">Super Admin</div>
        </div>
      </v-chip>

      <!-- User Profile -->
      <!-- <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="user-btn p-0" elevation="0" variant="text" :ripple="false">
            <v-avatar size="40" class="mr-2">
              <img src="@/assets/images/users/black-user.jpg" alt="User Avatar" />
            </v-avatar>

            <div class="d-flex flex-column">
              <span class="font-normal text-sm">John Doe</span>
              <span class="font-light text-xs">Super admin</span>
            </div>
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
      </v-menu> -->
    </div>
  </div>
</template>

<style scoped>
v-btn {
  text-transform: none;
}
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
