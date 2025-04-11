<template>
  <MainLayout>
    <div class="p-2">
      <h2 class="text-xl font-bold m-8">Statement Analysis Result</h2>
      <div class="p-2 md:p-8">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center text-blue-600 font-semibold">
          <i class="fas fa-arrow-left mr-2"></i> Back
        </button>

        <!-- Document Header -->
        <div class="bg-white shadow-lg rounded-lg p-4 mt-2">
         

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 mt-4">
            <p>
              <i class="fas fa-calendar mr-2"></i>
              <strong>Statement Period:</strong> <br />
              {{ statementPeriod }}
            </p>
           
            <p>
              <i class="fas fa-user-circle mr-2"></i>
              <strong>Account Name:</strong> <br />
              {{ clientName }}
            </p>


            <p>
              <i class="fas fa-user-circle mr-2"></i>
              <strong>Account Number:</strong> <br />
              {{ accountId }}
            </p>

            <!-- Download Report Button -->
            <div class="text-right mt-4">
              <v-btn
                no-uppercase
                size="large"
                class="normal-case p-4 bg-blue-600 hover:bg-blue-700 text-white text-none mr-2 custom-btn"
              >
                <i class="fas fa-download mr-2"></i>
                Download Analysis
              </v-btn>
            </div>
          </div>

          <!-- Summary Cards -->
          <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div class="bg-blue-100 p-4 rounded-lg text-center">
                        <p class="text-sm text-gray-500">Created</p>
                        <p class="text-lg font-semibold">25 March 2025</p>
                    </div>
                    <div class="bg-blue-100 p-4 rounded-lg text-center">
                        <p class="text-sm text-gray-500">
                            Transacting Month(s)
                        </p>
                        <p class="text-lg font-semibold">1</p>
                    </div>
                    <div
                        class="bg-blue-600 text-white p-4 rounded-lg text-center"
                    >
                        <p class="text-sm">Status</p>
                        <p class="text-lg font-semibold">Processed</p>
                    </div>
                </div> -->
        </div>

        <!-- Vuetify Tabs -->
        <div class="mt-6">
          <v-tabs align-tabs="center" class="mb-4" v-model="activeTab" color="primary">
            <v-tab value="summary">Summary</v-tab>
            <v-tab value="cash flow">Cash Flow</v-tab>
            <v-tab value="behavioral">Behavioral</v-tab>
            <v-tab value="transactions">Transactions</v-tab>
          </v-tabs>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import MainLayout from '@/layouts/full/MainLayout.vue'

const route = useRoute()
const authStore = useAuthStore()

const result = ref(null)
const loading = ref(true)
const error = ref(null)

const fileName = ref('')
const clientName = ref('')
const statementPeriod = ref('')
const accountId = ref('')

const fetchAnalysisResult = async (analysisId) => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
  const apiUrl = `https://dev02201.getjupita.com/api/${tenantId}/get-analysis-result?analysis_id=${analysisId}`

  try {
    const response = await Axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('statement analysis result page data:', response)
    result.value = response.data

    // Extract needed data
    const analysis = response.data?.data?.analysis_result?.analysis_result
    fileName.value = analysis?.name || 'N/A'
    clientName.value = analysis?.clientFullName || 'N/A'
    accountId.value = analysis?.accountId || 'N/A'

    const start = new Date(analysis?.createdDate)
    const end = new Date(analysis?.endDate)
    if (!isNaN(start) && !isNaN(end)) {
      statementPeriod.value = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
    } else {
      statementPeriod.value = 'Unknown period'
    }
  } catch (err) {
    console.error('Error fetching analysis result:', err)
    error.value = 'Unable to fetch analysis result.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const id = route.params.id
  if (id) {
    fetchAnalysisResult(id)
  } else {
    error.value = 'Invalid analysis ID.'
    loading.value = false
  }
})
</script>

<style scoped>
.custom-btn {
  background-color: #1f5aa3;
}
</style>
