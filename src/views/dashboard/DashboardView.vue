<script setup>
import { ref, onMounted } from 'vue'
import Axios from 'axios'
import MainLayout from '@/layouts/full/MainLayout.vue'
import Upload from '@/components/Upload.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const tenantId = authStore.tenant_id
const API_URL = `http://18.212.86.239/api/${tenantId}/fetch-tenant-analyses`

const documents = ref([])
const isLoading = ref(true)
const showModal = ref(false)

// Modal functions
const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// Fetch statements
const fetchStatements = async () => {
  try {
    const response = await Axios.get(API_URL)
    if (response.data && response.data.length > 0) {
      documents.value = response.data
    } else {
      documents.value = [] // If no data, set empty state
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    documents.value = [] // If there's an error, set empty state
  } finally {
    isLoading.value = false
  }
}

// Fetch on mounted
onMounted(() => {
  fetchStatements()
})

const getStatusColor = (status) => {
  if (status === 'Processed') return 'green'
  if (status === 'Pending') return 'orange'
  return 'red'
}
</script>

<template>
  <MainLayout>
    <div class="p-6">
      <!-- Header with Title and Add Statement Button -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold text-gray-800">Statements</h1>

        <v-btn
          @click="openModal"
          no-uppercase
          size="large"
          class="normal-case ml-auto p-4 bg-blue-600 hover:bg-blue-700 text-white text-none mr-2 custom-btn"
        >
          <i class="fa-solid fa-plus mr-2"></i>

          Add Statement
        </v-btn>
      </div>
    </div>

    <div class="p-6">
      <div v-if="isLoading" class="text-center py-6">Loading...</div>

      <div v-else class="overflow-x-auto" v-if="documents.length > 0">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th class="py-3 px-6 text-left">Name</th>
              <th class="py-3 px-6 text-left">Created Date</th>
              <th class="py-3 px-6 text-left">Status</th>
              <th class="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="text-gray-700 text-sm font-light">
            <tr
              v-for="doc in documents"
              :key="doc.id"
              class="border-b border-gray-200 hover:bg-gray-100"
            >
              <td class="py-3 px-6">{{ doc.name }}</td>
              <td class="py-3 px-6">{{ doc.created_date }}</td>
              <td class="py-3 px-6">
                <v-chip :color="getStatusColor(doc.status)" small>{{ doc.status }}</v-chip>
              </td>
              <td class="py-3 px-6 text-center">
                <span class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">View</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-else class="fill-height align-center justify-center">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th class="py-3 px-6 text-left">Name</th>
              <th class="py-3 px-6 text-left">Created Date</th>
              <th class="py-3 px-6 text-left">Status</th>
              <th class="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
        </table>
        <div class="mx-auto mt-4 text-center align-center w-[200px] h-[200px]">
          <img src="/src/assets/images/no-data.png" alt="No Data" />
          <div class="empty-text font-normal mt-8">No Statements</div>
        </div>
      </div>
    </div>

    <v-dialog v-model="showModal" persistent max-width="600px" class="pa-4">
      <template v-slot:default="{ close }">
        <div style="max-height: 80vh; overflow-y: auto">
          <Upload />
        </div>
      </template>
    </v-dialog>
  </MainLayout>
</template>

<style scoped>
.h-8 {
  height: 2rem;
}
.custom-btn {
  background-color: #0056d2;
}
</style>
