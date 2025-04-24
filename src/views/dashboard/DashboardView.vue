<script setup>
import { ref, onMounted, computed } from 'vue'
import Axios from 'axios'
import moment from 'moment'
import MainLayout from '@/layouts/full/MainLayout.vue'
import Upload from '@/components/Upload.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()

const statements = ref([])
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
  const savedAuth = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null

  console.log(JSON.parse(localStorage.getItem('data')))
  const token = savedAuth ? savedAuth?.token : computed(() => authStore.token)?.value
  const tenantId = savedAuth
    ? savedAuth?.user?.tenant_id
    : computed(() => authStore.tenant_id)?.value
  const API_URL = `https://dev02201.getjupita.com/api/${tenantId}/fetch-tenant-analyses`
  isLoading.value = true

  try {
    const response = await Axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('fetch statements data:', response)
    const rawAnalyses = response.data?.data?.analyses || []

    statements.value = rawAnalyses.map((item) => ({
  id: item.id,
  name: `${item.firstname} ${item.lastname}`,
  file_name: item.file_name,
  created_date: item.created_at, // raw date
  status: item.status
}))

  } catch (error) {
    console.error('Error fetching statements:', error)
    statements.value = []
  } finally {
    isLoading.value = false
  }
}

const sortedStatements = computed(() => {
  return [...statements.value].sort(
    (a, b) => new Date(b.created_date) - new Date(a.created_date)
  )
})

const fetchAnalysisResult = async (analysisId) => {
  const apiUrl = `https://dev02201.getjupita.com/api/${tenantId.value}/get-analysis-result?analysis_id=${analysisId};`

  const raw = {
    analysis_id: analysisId
  }
  // Log the request details before sending
  console.log('Sending request with analysis_id:', analysisId)
  console.log('Request body:', raw)
  try {
    const response = await Axios({
      method: 'get',
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      data: raw
    })

    console.log('Analysis result:', response.data)
    // Handle result here (e.g., show a modal, redirect, etc.)
  } catch (error) {
    console.error('Error fetching analysis result:', error)
  }
}
// Navigate to analysis page
const goToAnalysis = (analysisId) => {
  router.push({ name: 'StatementAnalysis', params: { id: analysisId } })
}

// Fetch on mounted
onMounted(() => {
  fetchStatements()
})

const getStatusColor = (status) => {
  if (status === 'PROCESSED') return 'green'
  if (status === 'Pending') return 'orange'
  return 'green'
}
</script>

<template>
  <MainLayout>
    <div class="p-6">
      <!-- Header with Title and Add Statement Button -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold text-blue-800">Statements</h1>

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
      <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[200px]">
        <v-progress-circular indeterminate color="blue" size="40" width="4" />
        <span class="mt-2 text-gray-600 text-sm">Loading statements...</span>
      </div>

      <div v-else-if="statements.length > 0" class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th class="py-3 px-6 text-left">S/N</th>
              <th class="py-3 px-6 text-left">Uploaded by</th>
              <th class="py-3 px-6 text-left">File Name</th>
              <th class="py-3 px-6 text-left">Created Date</th>
              <th class="py-3 px-6 text-left">Status</th>
              <th class="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="text-gray-700 text-sm font-light">
            <tr
  v-for="(doc, index) in sortedStatements"
  :key="doc.id"
  class="border-b border-gray-200 "
>
  <td class="py-3 px-6 text-left">{{ index + 1 }}</td>
  <td class="py-3 px-6">{{ doc.name }}</td>
  <td class="py-3 px-6">{{ doc.file_name }}</td>
  <td class="py-3 px-6">{{ moment(doc.created_date).format('MMMM Do, YYYY') }}</td>
  <td class="py-3 px-6">
    <span
      :class="doc.status === 'PROCESSED'
        ? 'text-green-600 py-1 text-xs font-semibold'
        : 'text-red-600 py-1 text-xs font-semibold'"
    >
      {{ doc.status }}
    </span>
  </td>
  <td class="py-3 px-6 text-center">
    <span
      @click="goToAnalysis(doc.id)"
      class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
    >
      View
    </span>
  </td>
</tr>

          </tbody>
        </table>
      </div>

      <div v-else class="fill-height align-center justify-center">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th class="py-3 px-6 text-left">Uploaded by</th>
              <th class="py-3 px-6 text-left">File Name</th>
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
          <Upload @close="closeModal" :on-success="fetchStatements" />
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
  background-color: #1f5aa3;
}
</style>
