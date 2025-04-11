<template>
  <MainLayout>
    <v-container>
      <!-- Wallet Balance Card -->
      <v-card class="rounded-lg pa-6" color="primary" dark>
        <div class="d-flex align-center justify-space-between">
          <div>
            <h2 class="text-h5 font-weight-bold">Current Wallet Balance</h2>
            <h4 class="text-md font-weight-bold mt-2">₦0,00.00</h4>
          </div>
          <div class="d-flex flex-column">
            <v-btn class="mb-2 bg-gray" text @click="openFundWallet"> Fund Wallet </v-btn>
          </div>
        </div>
      </v-card>

      <!-- Credit History Table -->
      <v-card class="mt-6 pa-4 rounded-lg">
        <h3 class="mb-4 font-weight-bold">Credit History</h3>

        <div class="overflow-x-auto" v-if="creditHistory.length > 0">
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

            <tbody class="text-gray-700 text-sm font-light"></tbody>
          </table>
        </div>
        <div v-else class="fill-height align-center justify-center">
          <h1>Loading credit history</h1>
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
            <v-btn text @click="fundWalletDialog = false">Cancel</v-btn>
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
      <v-card-text>
        <iframe
          v-if="!loadingPayment"
          :src="paymentLink"
          width="100%"
          height="400px"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </v-card-text>
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

// Open Modal
const openFundWallet = () => {
  fundWalletDialog.value = true
}

const fetchTransactions = async () => {
  const savedAuth = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null

  console.log(JSON.parse(localStorage.getItem('data')))
  const token = savedAuth ? savedAuth?.token : computed(() => authStore.token)?.value
  const tenantId = savedAuth
    ? savedAuth?.user?.tenant_id
    : computed(() => authStore.tenant_id)?.value
  const API_URL = `https://dev02201.getjupita.com/api/${tenantId}/get-tenant-wallet`

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('fetch statements data:', response)
  } catch (error) {
    console.error('Error fetching wallet transactions:', error)
  } finally {
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

onMounted(() => {
  fetchTransactions()
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
