<template>
  <MainLayout>
    <v-container>
      <!-- Wallet Balance Card -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-md p-6 shadow-xl">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold tracking-wide">Current Wallet Balance</h2>
            <div class="flex gap-4">
              <p class="mt-3 text-xl font-extrabold tracking-tight">{{ formatCurrency(balance) }}</p>
            <button
              @click="fetchWallet"
              class="text-white hover:text-gray-200 m-3"
              title="Refresh Balance"
            >
              <i :class="['fas fa-rotate-right text-lg', isLoading && 'fa-spin']"></i>
            </button>
            </div>
            
          </div>
          <div class="flex flex-col items-end space-y-2">
            <button
              @click="openFundWallet"
              class="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
            >
              Fund Wallet
            </button>
           
          </div>
        </div>
      </div>

      <!-- Credit History Table -->
      <v-card class="mt-6 pa-4 rounded-lg">
        <h3 class="mb-4 font-semibold">Credit History</h3>
        <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[200px]">
          <v-progress-circular indeterminate color="blue" size="40" width="4" />
          <span class="mt-2 text-gray-600 text-sm">Loading wallet history...</span>
        </div>

        <div class="overflow-x-auto" v-else-if="creditHistory.length > 0">
          <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th class="py-3 px-6 text-left">Date</th>
                <th class="py-3 px-6 text-left">Description</th>
                <th class="py-3 px-6 text-left">Amount</th>
                <th class="py-3 px-6 text-left">Old Balance</th>
                <th class="py-3 px-6 text-center">New Balance</th>
              </tr>
            </thead>

            <tbody class="text-gray-700 text-sm font-light">
              <tr v-for="(entry, index) in creditHistory" :key="index">
                <td class="py-3 px-6 text-left">{{ entry.date }}</td>
                <td class="py-3 px-6 text-left">{{ entry.description }}</td>
                <td class="py-3 px-6 text-left">{{ formatCurrency(entry.amount) }}</td>
                <td class="py-3 px-6 text-left">{{ formatCurrency(entry.old_balance) }}</td>
                <td class="py-3 px-6 text-center">{{ formatCurrency(entry.new_balance) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state -->
        <div v-else class="fill-height align-center justify-center">
          <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th class="py-3 px-6 text-left">Date</th>
                <th class="py-3 px-6 text-left">Description</th>
                <th class="py-3 px-6 text-left">Amount</th>
                <th class="py-3 px-6 text-left">Old Balance</th>
                <th class="py-3 px-6 text-center">New Balance</th>
              </tr>
            </thead>
          </table>
          <div class="mx-auto mt-4 text-center align-center w-[200px] h-[200px]">
            <div class="empty-text text-red-800 font-normal mt-8">No credit history</div>
          </div>
        </div>
      </v-card>

      <div
        v-if="loading"
        class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10"
      >
        <v-progress-circular indeterminate color="green" class="mx-auto my-4" />
      </div>

      <!-- Fund Wallet Modal -->
      <v-dialog v-model="fundWalletDialog" max-width="400px">
        <v-card>
          <v-card-title class="text-h5">Fund Wallet</v-card-title>
          <v-card-text>
            <v-text-field
              label="Amount"
              v-model="amount"
              type="number"
              variant="outlined"
              color="blue"
            >
              <template v-slot:prepend>
                <span>₦</span>
              </template>
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="closeFundWallet">Cancel</v-btn>
            <v-btn color="primary" @click="fundWallet">Fund</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </MainLayout>

  <!-- Payment Widget Modal -->
  <v-dialog v-model="paymentModal" max-width="600px">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">Complete Payment</v-card-title>

      <!-- <div v-if="loadingPayment" class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="primary" />
      </div> -->
      <div>
        <v-card-text>
          <iframe
            :src="paymentLink"
            width="100%"
            height="400px"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </v-card-text>
      </div>

      <v-card-actions>
        <v-spacer />
        <v-btn color="danger" @click="paymentModal = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MainLayout from '@/layouts/full/MainLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
import axios from 'axios'
import Swal from 'sweetalert2'
const loading = ref(false)
const creditHistory = ref([])
import Cleave from 'cleave.js'
function formatCurrency(number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(number || 0)
}
const isLoading = ref(true)

// Table Headers
const headers = [
  { title: 'Date', key: 'date', sortable: true },
  { title: 'Description', key: 'description', sortable: true },
  { title: 'Amount', key: 'amount', sortable: true },
  { title: 'Old Balance', key: 'old_balance', sortable: true },
  { title: 'New Balance', key: 'new_balance', sortable: true }
]
const loadingPayment = ref(true)

// Fund Wallet Modal
const fundWalletDialog = ref(false)
const amount = ref('')
const paymentModal = ref(false)
const paymentLink = ref('')
const balance = ref('')

// Open Modal
const openFundWallet = () => {
  fundWalletDialog.value = true
}

const closeFundWallet = () => {
  fetchWallet()
  fundWalletDialog.value = false
}

const fetchWallet = async () => {
  const savedAuth = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null

  console.log(JSON.parse(localStorage.getItem('data')))
  const token = savedAuth ? savedAuth?.token : computed(() => authStore.token)?.value
  const tenantId = savedAuth
    ? savedAuth?.user?.tenant_id
    : computed(() => authStore.tenant_id)?.value
  const API_URL = `https://dev02201.getjupita.com/api/${tenantId}/get-tenant-wallet`
  isLoading.value = true
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('fetch wallet data:', response)
    const wallet = response.data.data.wallet
    balance.value = wallet.balance

    // Populate credit history with wallet details
    creditHistory.value = [
      {
        date: new Date(wallet.updated_at).toLocaleString(),
        description: 'Wallet Funded',
        amount: wallet.balance - wallet.previous_balance,
        old_balance: wallet.previous_balance,
        new_balance: wallet.balance
      }
    ]
  } catch (error) {
    console.error('Error fetching wallet:', error)
  } finally {
    isLoading.value = false
  }
}

const fundWallet = async () => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
  const loading = ref(false)

  if (!amount.value || amount.value <= 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Amount',
      text: 'Please enter a valid amount to fund your wallet.'
    })
    return
  }

  const API_URL = `https://dev02201.getjupita.com/api/${tenantId}/initialize-payment`
  console.log('fund wallet amount:', amount.value)
  console.log('fund wallet token:', token)

  try {
    loading.value = true
    const response = await axios.post(
      API_URL,
      { amount: amount.value }, // POST body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(response)

    paymentLink.value = response.data.data.link
    // Open the payment link in the modal
    paymentModal.value = true

    fundWalletDialog.value = false
    fetchWallet()
  } catch (error) {
    console.error('Funding error:', error)
    fundWalletDialog.value = false
    Swal.fire({
      icon: 'error',
      title: 'Payment Failed',
      text: error?.response?.data?.message || 'Failed to initiate payment. Please try again.'
    })
  } finally {
    loading.value = false
  }
}
const onIframeLoad = () => {
  loadingPayment.value = false
}

onMounted(() => {
  fetchWallet()
})
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}
.v-btn {
  text-transform: none;
}
</style>
