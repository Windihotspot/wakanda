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
            <i class="fas fa-id-card mr-2"></i>
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

        <!-- Vuetify Tabs -->
        <div class="mt-6">
          <v-tabs align-tabs="center" class="mb-4" v-model="activeTab" color="primary">
            <v-tab value="summary">Summary</v-tab>
            <v-tab value="cash flow">Cash Flow</v-tab>
            <v-tab value="behavioral">Behavioral</v-tab>
            <v-tab value="transactions">Transactions</v-tab>
          </v-tabs>

          <!-- Tab content area -->
          <v-tabs-window v-model="activeTab">
            <!-- Summary Tab -->
            <v-tabs-window-item value="summary">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
                <div
                  class="bg-blue-50 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                >
                  <div class="text-md font-semibold">{{formatCurrency(totalCredits)}}</div>
                  <div class="text-sm text-gray-500 mt-1">Total Credit</div>
                </div>
                <div
                  class="bg-red-50 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                >
                  <div class="text-md font-semibold">{{formatCurrency(totalDebits)}}</div>
                  <div class="text-sm text-gray-500 mt-1">Total Debits</div>
                </div>
                <div
                  class="bg-green-50 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                >
                  <div class="text-md font-semibold">{{formatCurrency(averageMonthlyCredits)}}</div>
                  <div class="text-sm text-gray-500 mt-1">Avg. Monthly Credit</div>
                </div>
                <div
                  class="bg-purple-50 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                >
                  <div class="text-md font-semibold">{{formatCurrency(averageMonthlyDebits)}}</div>
                  <div class="text-sm text-gray-500 mt-1">Avg. Monthly Debits</div>
                </div>
                <div
                  class="bg-gray-100 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                >
                  <div class="text-md font-semibold">{{formatCurrency(averageMonthlyBalance)}}</div>
                  <div class="text-sm text-gray-500 mt-1">Average Monthly Balance</div>
                </div>
              </div>
            </v-tabs-window-item>

            <!-- Other Tabs (empty for now) -->
            <v-tabs-window-item value="cash flow">
              <div class="text-center text-gray-500 py-10">Cash Flow Content</div>
            </v-tabs-window-item>
            <v-tabs-window-item value="behavioral">
              <div class="text-center text-gray-500 py-10">Behavioral Content</div>
            </v-tabs-window-item>
            <v-tabs-window-item value="transactions">
              <div class="text-center text-gray-500 py-10">Transactions Content</div>
            </v-tabs-window-item>
          </v-tabs-window>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import MainLayout from '@/layouts/full/MainLayout.vue'
import moment from 'moment'

const activeTab = ref('Summary')

function formatCurrency(number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(number || 0)
}

const route = useRoute()
const authStore = useAuthStore()

const result = ref(null)
const loading = ref(true)
const error = ref(null)

const fileName = ref('')
const clientName = ref('')
const statementPeriod = ref('')
const accountId = ref('')
const totalDebits = ref(0)
const totalCredits = ref(0)
const averageMonthlyDebits = ref(0)
const averageMonthlyCredits = ref(0)
const averageMonthlyBalance = ref(0)

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
    const cashFlow = analysis?.cashFlowAnalysis
    // Use turnover values directly
    totalDebits.value = cashFlow?.totalDebitTurnOver || 0
    totalCredits.value = cashFlow?.totalCreditTurnover || 0

    // Extract averages
    averageMonthlyDebits.value = cashFlow?.averageMonthlyDebits || 0
    averageMonthlyCredits.value = cashFlow?.averageMonthlyCredits || 0
    averageMonthlyBalance.value = cashFlow?.averageMonthlyBalance || 0

    const start = new Date(analysis?.createdDate)
    const end = new Date(analysis?.endDate)
    if (!isNaN(start) && !isNaN(end)) {
      statementPeriod.value = `${moment(start).format('MMMM D, YYYY')} - ${moment(end).format('MMMM D, YYYY')}`
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
