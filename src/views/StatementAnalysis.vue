<template>
  <MainLayout>
    <div class="p-2">
      <h2 class="text-xl font-bold mt-2 ml-6">Statement Analysis Result</h2>
      <template v-if="loading">
        <div class="flex items-center justify-center h-96">
          <v-progress-circular
            :size="100"
            :width="10"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
      <template v-else>
        <div class="p-2 md:p-8">
          <!-- Back Button -->
          <div class="flex justify-between">
            <RouterLink to="/dashboard">
              <button @click="goBack" class="mb-2 flex items-center text-blue-600 font-semibold">
                <i class="fas fa-arrow-left mr-2"></i> Back
              </button>
            </RouterLink>
            <!-- Download Report Button -->
            <div class="text-right">
              <v-btn
                @click="downloadAnalysis"
                no-uppercase
                size="small"
                class="normal-case p-4 bg-blue-600 hover:bg-blue-700 text-white text-none mr-2 custom-btn"
              >
                <i class="fas fa-download mr-2"></i>
                Download Analysis
              </v-btn>
            </div>
          </div>

          <!-- Document Header -->

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 mt-4 mb-6">
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
          </div>

          <!-- Vuetify Tabs -->
          <div class="mt-6">
            <v-tabs align-tabs="center" class="mb-6" v-model="activeTab" color="primary">
              <v-tab value="summary">Summary</v-tab>
              <v-tab value="cash flow">Cash Flow</v-tab>
              <v-tab value="behavioral">Behavioral</v-tab>
              <v-tab value="transactions">Transactions</v-tab>
            </v-tabs>

            <!-- Tab content area -->
            <v-tabs-window v-model="activeTab">
              <!-- Summary Tab -->
              <v-tabs-window-item value="summary">
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4"
                >
                  <div
                    class="bg-blue-50 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                  >
                    <div class="text-md font-semibold">{{ formatCurrency(totalCredits) }}</div>
                    <div class="text-sm text-gray-500 mt-1">Total Credit</div>
                  </div>
                  <div
                    class="bg-red-50 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                  >
                    <div class="text-md font-semibold">{{ formatCurrency(totalDebits) }}</div>
                    <div class="text-sm text-gray-500 mt-1">Total Debits</div>
                  </div>
                  <div
                    class="bg-green-50 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                  >
                    <div class="text-md font-semibold">
                      {{ formatCurrency(averageMonthlyCredits) }}
                    </div>
                    <div class="text-sm text-gray-500 mt-1">Avg. Monthly Credit</div>
                  </div>
                  <div
                    class="bg-purple-50 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                  >
                    <div class="text-md font-semibold">
                      {{ formatCurrency(averageMonthlyDebits) }}
                    </div>
                    <div class="text-sm text-gray-500 mt-1">Avg. Monthly Debits</div>
                  </div>
                  <div
                    class="bg-gray-100 text-center shadow rounded-2xl p-4 flex flex-col items-center justify-center"
                  >
                    <div class="text-md font-semibold">
                      {{ formatCurrency(averageMonthlyBalance) }}
                    </div>
                    <div class="text-sm text-gray-500 mt-1">Average Monthly Balance</div>
                  </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4 p-4">
                  <!-- Most Frequent Expense -->
                  <div class="bg-white rounded-2xl shadow-md p-4 w-full md:w-1/3">
                    <p class="text-sm text-gray-500 mb-1">Most Frequent Expense</p>
                    <p class="font-semibold text-gray-800 leading-tight">
                      {{ mostFrequentExpense }}<br />
                    </p>
                  </div>

                  <!-- Highest Spend -->
                  <div class="bg-white rounded-2xl shadow-md p-4 w-full md:w-1/3">
                    <p class="text-sm text-gray-500 mb-1">Highest Spend</p>
                    <p class="font-semibold text-gray-800 text-lg">{{formatCurrency(highestSpend) }}</p>
                    <p class="text-sm font-semibold text-gray-600 mt-1">Transaction Date: {{monthWithHighestSpend}}</p>
                  </div>

                  <!-- Most Frequent Expense Amount -->
                  <div class="bg-white rounded-2xl shadow-md p-4 w-full md:w-1/3">
                    <p class="text-sm text-gray-500 mb-1">Most Frequent Expense Amount</p>
                    <p class="font-semibold text-gray-800 text-lg">
                      {{ formatCurrency(mostFrequentExpenseAmount) }}
                    </p>
                  </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">Expenses</h2>
                  <table class="min-w-full table-auto border-collapse">
                    <thead>
                      <tr
                        class="text-left text-sm font-semibold text-gray-600 border-b border-gray-200"
                      >
                        <th class="py-3 px-4">Expenses</th>
                        <th class="py-3 px-4">Average Monthly Expenditure</th>
                        <th class="py-3 px-4">Total Expenditure</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in expenseItems"
                        :key="index"
                        class="text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td class="py-3 px-4">{{ item.label }}</td>
                        <td class="py-3 px-4">{{ formatCurrency(item.monthly) }}</td>
                        <td class="py-3 px-4">{{ formatCurrency(item.total) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </v-tabs-window-item>

              <!-- Other Tabs (empty for now) -->
              <v-tabs-window-item value="cash flow">
                <div class="flex flex-col md:flex-row gap-4 text-center text-gray-500 py-10">
                  <!-- Inflow Summary -->
                  <div class="flex-1 bg-white p-6 rounded-xl shadow">
                    <h2 class="text-lg font-semibold text-blue-800 mb-4">Inflow Summary</h2>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span>Total Inflow</span>
                        <span class="text-green-600 font-bold">{{
                          formatCurrency(totalInflow)
                        }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Average Monthly Inflow</span>
                        <span class="font-medium">{{ formatCurrency(averageMonthlyCredits) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Average Weekly Inflow</span>
                        <span class="font-medium">{{ formatCurrency(averageWeeklyInflow) }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Outflow Summary -->
                  <div class="flex-1 bg-white p-6 rounded-xl shadow">
                    <h2 class="text-lg font-semibold text-blue-800 mb-4">Outflow Summary</h2>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span>Total Outflow</span>
                        <span class="text-red-600 font-bold">{{
                          formatCurrency(totalOutflow)
                        }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Average Monthly Outflow</span>
                        <span class="font-medium">{{ formatCurrency(averageMonthlyDebits) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Average Weekly Outflow</span>
                        <span class="font-medium">{{ formatCurrency(averageWeeklyOutflow) }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex gap-4 justify-between bg-[#f0f8ff] p-6">
                  <!-- Card 1 -->
                  <div class="flex justify-between bg-[#1f4e99] text-white rounded-2xl p-6 w-full">
                    <div class="flex-1 text-md font-semibold">
                      {{ formatCurrency(averageMonthlyBalance) }}
                      <div class="text-sm mt-2">Average Monthly Balance</div>
                    </div>

                    <div class="flex-1 text- text-md font-semibold">
                      {{ formatCurrency(averageWeeklyBalance) }}
                      <div class="text-sm mt-2">Average Weekly Balance</div>
                    </div>
                  </div>

                  <!-- cash flow-->
                  <div class="flex justify-between bg-[#1f4e99] text-white rounded-2xl p-6 w-full">
                    <div class="flex-1">
                      <div class="text-md font-semibold">Negative Cash Flow</div>
                      <div class="text-sm mt-2">Inflow to Outflow Rate</div>
                    </div>
                    <div class="flex-1">
                      <div class="text-md font-semibold">Negative Cash Flow</div>
                      <div class="text-sm mt-2">Overall Inflow to Outflow</div>
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">Credit & Debit Summary</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Monthly Section -->
                    <div class="bg-white p-4 rounded-lg shadow">
                      <h3 class="text-lg font-bold text-gray-700 mb-3">Monthly Credit & Debit</h3>
                      <div class="overflow-y-auto max-h-96">
                        <table class="min-w-full table-auto text-sm text-left text-gray-600">
                          <thead class="bg-gray-100 font-medium text-gray-700">
                            <tr>
                              <th class="px-2 py-2">Month</th>
                              <th class="px-2 py-2">Total Credit</th>
                              <th class="px-2 py-2">Total Debit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(entry, index) in monthlyData" :key="index" class="border-b">
                              <td class="px-2 py-2">{{ entry.month }}</td>
                              <td class="px-2 py-2">{{ formatCurrency(entry.credit) }}</td>
                              <td class="px-2 py-2">{{ formatCurrency(entry.debit) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <!-- Weekly Section -->
                    <div class="bg-white p-4 rounded-lg shadow">
                      <h3 class="text-lg font-bold text-gray-700 mb-3">Weekly Credit & Debit</h3>
                      <div class="overflow-y-auto max-h-96">
                        <table class="min-w-full table-auto text-sm text-left text-gray-600">
                          <thead class="bg-gray-100 font-medium text-gray-700">
                            <tr>
                              <th class="px-2 py-2">Week</th>
                              <th class="px-2 py-2">Total Credit</th>
                              <th class="px-2 py-2">Total Debit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(entry, index) in weeklyData" :key="index" class="border-b">
                              <td class="px-2 py-2">{{ entry.week }}</td>
                              <td class="px-2 py-2">{{ formatCurrency(entry.credit) }}</td>
                              <td class="px-2 py-2">{{ formatCurrency(entry.debit) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </v-tabs-window-item>
              <v-tabs-window-item value="behavioral">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <!-- Loan Analysis Card -->
                  <div class="bg-white p-6 rounded-2xl shadow-md">
                    <h2 class="text-lg font-semibold text-blue-700 mb-4">Loan Analysis</h2>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span>Number of Loan Transactions</span
                        ><span>{{ numberLoanTransactions }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Total Loan Amount</span
                        ><span>{{ formatCurrency(totalLoanAmount) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Average Monthly Loan Amount</span
                        ><span>{{ formatCurrency(averageMonthlyLoanAmount) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Total Loan Repayment Amount</span
                        ><span>{{ formatCurrency(totalLoanRepaymentAmount) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Average Monthly Loan Repayment Amount</span
                        ><span>{{ formatCurrency(averageMonthlyLoanRepaymentAmount) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Loan to Inflow Rate</span><span>{{ loanToInflowRate }}%</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Latest Loan Transaction Date</span
                        ><span>{{ latestLoanTransaction }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Latest Loan Repayment Transaction Date</span
                        ><span>{{ latestLoanTransaction }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Patterns Card -->
                  <div class="bg-white p-6 rounded-2xl shadow-md">
                    <h2 class="text-lg font-semibold text-blue-700 mb-4">Patterns</h2>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span>Account Sweep</span
                        ><span
                          class="font-semibold"
                          :class="accountSweep === 'YES' ? 'text-green-600' : 'text-gray-600'"
                          >{{ accountSweep }}</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span>Number of Betting Transactions</span><span>0</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Gambling Rate</span><span>{{ gamblingRate }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Percentage of Debit Transactions</span><span>74%</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Percentage of Credit Transactions</span><span>26%</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Percentage of Transactions between 500k - 1M</span><span>4%</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Percentage of Transactions Greater Than 1M</span><span>23%</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Most Frequent Balance Rage</span><span>1,000,000 - 5,000,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-4 justify-between bg-[#f0f8ff] p-6">
                  <!-- Card 1 -->
                  <div class="flex justify-between bg-[#1f4e99] text-white rounded-2xl p-6 w-full">
                    <div class="flex-1 text-md font-semibold">
                      {{ formatCurrency(averageMonthlyBalance) }}
                      <div class="text-sm mt-2">Average Monthly Balance</div>
                    </div>

                    <div class="flex-1 text- text-md font-semibold">
                      {{ formatCurrency(averageWeeklyBalance) }}
                      <div class="text-sm mt-2">Average Weekly Balance</div>
                    </div>
                  </div>

                  <!-- cash flow-->
                </div>
              </v-tabs-window-item>
              <v-tabs-window-item value="transactions">
                <div class="text-center text-gray-500 py-10">Transactions Content</div>
              </v-tabs-window-item>
            </v-tabs-window>
          </div>
        </div>
      </template>
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
import { ElMessage } from 'element-plus'

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
const averageWeeklyBalance = ref(0)

const totalInflow = ref(0)
const averageMonthlyInflow = ref(0)
const averageWeeklyInflow = ref(0)

const totalOutflow = ref(0)
const averageMonthlyOutflow = ref(0)
const averageWeeklyOutflow = ref(0)

const monthlyData = ref([])
const weeklyData = ref([])

const mostFrequentExpense = ref(0)
const mostFrequentExpenseAmount = ref(0)

const highestSpend = ref(0)
 const monthWithHighestSpend = ref('')

const expenseItems = ref([])

const accountSweep = ref('')
const gamblingRate = ref(0)
const gamblingStatus = ref('')
const loanInflowRate = ref(0)
const accountActivity = ref(0)
const totalLoanAmount = ref(0)
const loanToInflowRate = ref(0)
const numberLoanTransactions = ref(0)
const averageMonthlyLoanAmount = ref(0)
const totalLoanRepaymentAmount = ref(0)
const loanRepaymentToInflowRate = ref(0)
const numberRepaymentTransactions = ref(0)
const latestLoanTransaction = ref('')
const overallInflowToOutflowRate = ref('')
const percentOfInflowIrregularity = ref(0)
const monthToMonthInflowToOutflowRate = ref('')
const averageMonthlyLoanRepaymentAmount = ref(0)

const fetchAnalysisResult = async (analysisId) => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
  const apiUrl = `https://dev02201.getjupita.com/api/${tenantId}/get-analysis-result?analysis_id=${analysisId}`
  loading.value = true

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

    const behavior = analysis?.behavioralAnalysis || {}

    accountSweep.value = behavior.accountSweep || 'No'
    gamblingRate.value = behavior.gamblingRate || 0
    gamblingStatus.value = behavior.gamblingStatus || 'N/A'
    loanInflowRate.value = behavior.loanInflowRate || 0
    accountActivity.value = behavior.accountActivity || 0
    totalLoanAmount.value = behavior.totalLoanAmount || 0
    loanToInflowRate.value = behavior.loanToInflowRate || 0
    numberLoanTransactions.value = behavior.numberLoanTransactions || 0
    averageMonthlyLoanAmount.value = behavior.averageMonthlyLoanAmount || 0
    totalLoanRepaymentAmount.value = behavior.totalLoanRepaymentAmount || 0
    loanRepaymentToInflowRate.value = behavior.loanRepaymentToInflowRate || 0
    numberRepaymentTransactions.value = behavior.numberRepaymentTransactions || 0

    const latestLoan = behavior.latestLoanTransaction?.[0]
    latestLoanTransaction.value = latestLoan
      ? `₦${latestLoan.amount.toLocaleString()} on ${moment(latestLoan.date).format('MMMM D, YYYY')}`
      : 'N/A'

    overallInflowToOutflowRate.value = behavior.overallInflowToOutflowRate || 'N/A'
    percentOfInflowIrregularity.value = behavior.percentOfInflowIrregularity || 0
    monthToMonthInflowToOutflowRate.value = behavior.monthToMonthInflowToOutflowRate || 'N/A'
    averageMonthlyLoanRepaymentAmount.value = behavior.averageMonthlyLoanRepaymentAmount || 0
    const cashFlow = analysis?.cashFlowAnalysis
    console.log('cash flow data:', cashFlow)

    mostFrequentExpense.value = analysis?.spendAnalysis.mostFrequentExpense
    mostFrequentExpenseAmount.value = analysis?.spendAnalysis.mostFrequentExpenseAmount

    const spend = response.data?.data?.analysis_result?.analysis_result?.spendAnalysis || {}

    highestSpend.value = spend.highestSpend
    monthWithHighestSpend.value = moment(spend.monthWithHighestSpend, 'M/YYYY').format('MMMM YYYY')


    expenseItems.value = [
      {
        label: 'Others',
        monthly: spend.averageMonthlySpendOnOthers ?? 0,
        total: 12 * (spend.averageMonthlySpendOnOthers ?? 0)
      },
      {
        label: 'Rent',
        monthly: spend.averageMonthlySpendOnRent ?? 0,
        total: 12 * (spend.averageMonthlySpendOnRent ?? 0)
      },
      {
        label: 'Hospitality and Food',
        monthly: spend.averageMonthlySpendOnHospitalityAndFood ?? 0,
        total: 12 * (spend.averageMonthlySpendOnHospitalityAndFood ?? 0)
      },
      {
        label: 'Transportation',
        monthly: spend.averageMonthlySpendOnTransportation ?? 0,
        total: 12 * (spend.averageMonthlySpendOnTransportation ?? 0)
      },
      {
        label: 'Utilities',
        monthly: spend.averageMonthlySpendOnUtilities ?? 0,
        total: 12 * (spend.averageMonthlySpendOnUtilities ?? 0)
      },
      {
        label: 'Charges and Stamp Duty',
        monthly: spend.averageMonthlySpendOnChargesAndStampDuty ?? 0,
        total: 12 * (spend.averageMonthlySpendOnChargesAndStampDuty ?? 0)
      },
      {
        label: 'Transfer',
        monthly: spend.averageMonthlySpendOnTransfer ?? 0,
        total: 12 * (spend.averageMonthlySpendOnTransfer ?? 0)
      },
      {
        label: 'ATM Withdrawals and POS',
        monthly: spend.averageMonthlySpendOnAtmAndPOS ?? 0,
        total: 12 * (spend.averageMonthlySpendOnAtmAndPOS ?? 0)
      }
    ]

    // Use turnover values directly
    totalDebits.value = cashFlow?.totalDebitTurnOver || 0
    totalCredits.value = cashFlow?.totalCreditTurnover || 0

    // Extract averages
    averageMonthlyDebits.value = cashFlow?.averageMonthlyDebits || 0
    averageMonthlyCredits.value = cashFlow?.averageMonthlyCredits || 0
    averageMonthlyBalance.value = cashFlow?.averageMonthlyBalance || 0
    averageWeeklyBalance.value = cashFlow?.averageWeeklyBalance || 0

    totalInflow.value = cashFlow?.totalCreditTurnover || 0
    averageMonthlyInflow.value = cashFlow?.averageMonthlyCredits || 0
    averageWeeklyInflow.value = cashFlow?.averageWeeklyCredits || 0

    totalOutflow.value = cashFlow?.totalDebitTurnOver || 0
    averageMonthlyOutflow.value = cashFlow?.averageMonthlyDebits || 0
    averageWeeklyOutflow.value = cashFlow?.averageWeeklyDebits || 0

    // Set Monthly Data
    const inflows = cashFlow?.monthlyInflow || []
    const outflows = cashFlow?.monthlyOutflow || []

    const monthlyMap = new Map()

    inflows.forEach((item) => {
  const dateKey = `${item.month_name} ${item.year}`
  const formattedMonth = moment(dateKey, 'MMMM YYYY').format('MMM YYYY') // e.g., Jan 2024

  const key = `${item.month_name}-${item.year}`
  monthlyMap.set(key, {
    month: formattedMonth,
    credit: item.amount,
    debit: 0
  })
})

// Then, merge outflows into the same months
outflows.forEach((item) => {
  const dateKey = `${item.month_name} ${item.year}`
  const formattedMonth = moment(dateKey, 'MMMM YYYY').format('MMM YYYY')

  const key = `${item.month_name}-${item.year}`
  if (monthlyMap.has(key)) {
    monthlyMap.get(key).debit = item.amount
  } else {
    monthlyMap.set(key, {
      month: formattedMonth,
      credit: 0,
      debit: item.amount
    })
  }
})

    monthlyData.value = Array.from(monthlyMap.values())

    //set weekly data
    const weeklyInflows = cashFlow?.weeklyInflow || []
    const weeklyOutflows = cashFlow?.weeklyOutflow || []

    const weeklyMap = new Map()

    weeklyInflows.forEach((item) => {
      const month = moment().month(item.month_name).format('MMM') // e.g., "Jan"
      const key = `${item.year}-${month}-W${item.week}`
      weeklyMap.set(key, {
        week: `${month} ${item.year} | ${item.week}`,

        credit: item.amount,
        debit: 0
      })
    })

    weeklyOutflows.forEach((item) => {
      const month = moment().month(item.month_name).format('MMM')
      const key = `${item.year}-${month}-W${item.week}`
      if (weeklyMap.has(key)) {
        weeklyMap.get(key).debit = item.amount
      } else {
        weeklyMap.set(key, {
          week: `${month} ${item.year} ${item.week}`,

          credit: 0,
          debit: item.amount
        })
      }
    })

    weeklyData.value = Array.from(weeklyMap.values())

    const start = new Date(analysis?.startDate)
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

const downloadAnalysis = async () => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
  const analysisId = route.params.id

  const apiUrl = `https://dev02201.getjupita.com/api/${tenantId}/download-insight-report?analysis_id=${analysisId}`

  let loadingMessage = null

  try {
    // Show persistent snackbar
    loadingMessage = ElMessage({
      message: 'Getting your analysis report...',
      type: 'success',
      duration: 0, // stays visible until manually closed
      showClose: true
    })

    const response = await Axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('download analysis response:', response.data)

    const download = response.data.data.download

    if (!download || !download.document_url || !download.document_name) {
      throw new Error('No download information or document URL found in the response.')
    }

    // Close loading toast
    ElMessage.closeAll()

    // Get the original document name
    const originalFileName = download.document_name || 'analysis_report.pdf'

    // Ensure the file has a .pdf extension
    const fileExtension = originalFileName.split('.').pop()
    const correctFileName = fileExtension === 'pdf' ? originalFileName : `${originalFileName}.pdf`

    // Get the document URL
    const fileUrl = download.document_url

    // Trigger file download
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = correctFileName // Ensure the file name is set correctly
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show success toast
    ElMessage({
      message: 'Analysis report downloaded successfully.',
      type: 'success',
      duration: 60000
    })
  } catch (error) {
    console.error('Download failed:', error)
    ElMessage.closeAll()
    ElMessage.error('Failed to download analysis. Please try again.')
  }
}
</script>

<style scoped>
.custom-btn {
  background-color: #1f5aa3;
}
.custom-tabs {
  background-color: #f0f4f8; /* Light background */
  border-radius: 1000px;

  max-width: fit-content;
  margin: auto;
}

.custom-tabs .v-tab {
  border-radius: 10000px;
  min-width: 120px;
  text-transform: none;
  font-weight: 500;
  color: #555;
}

.custom-tabs .v-tab--selected {
  background-color: #1e5db3; /* Active tab color */
  color: white !important;
}
</style>
