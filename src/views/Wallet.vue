<template>
  <MainLayout>
    <v-container>
      <!-- Wallet Balance Card -->
      <v-card class="rounded-lg pa-6" color="primary" dark>
        <div class="d-flex align-center justify-space-between">
          <div>
            <h2 class="text-h5 font-weight-bold">Current Wallet Balance</h2>
            <h4 class="text-md font-weight-bold mt-2">₦1,500.00</h4>
          </div>
          <div class="d-flex flex-column">
            <v-btn class="mb-2 bg-gray" text @click="openFundWallet"> Fund Wallet </v-btn>
          </div>
        </div>
      </v-card>

      <!-- Credit History Table -->
      <v-card class="mt-6 pa-4 rounded-lg">
        <h3 class="text-h6 font-weight-bold">Credit History</h3>
        <v-data-table
          :headers="headers"
          :items="creditHistory"
          class="elevation-1 mt-4"
          item-value="date"
        >
          <template v-slot:item.amount="{ item }">
            <span class="font-weight-bold text-green-darken-2">₦{{ item.amount }}</span>
          </template>

          <template v-slot:item.old_balance="{ item }">
            <span>₦{{ item.old_balance }}</span>
          </template>

          <template v-slot:item.new_balance="{ item }">
            <span class="font-weight-bold">₦{{ item.new_balance }}</span>
          </template>

          <!-- Empty State -->
          <template v-slot:no-data>
            <div class="text-center py-6">
              <v-icon size="48" color="grey lighten-1">mdi-wallet</v-icon>
              <p class="mt-2 text-subtitle-1 text-red-600 font-weight-medium">No credit history available</p>
            </div>
          </template>
        </v-data-table>
      </v-card>

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
              prepend-inner-icon="mdi-currency-ngn"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="fundWalletDialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="fundWallet">Fund</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import MainLayout from '@/layouts/full/MainLayout.vue'

// Sample Credit History Data
const creditHistory = ref([])

// Table Headers
const headers = [
  { title: 'Date', key: 'date', sortable: true },
  { title: 'Description', key: 'description', sortable: true },
  { title: 'Amount', key: 'amount', sortable: true },
  { title: 'Old Balance', key: 'old_balance', sortable: true },
  { title: 'New Balance', key: 'new_balance', sortable: true }
]

// Fund Wallet Modal
const fundWalletDialog = ref(false)
const amount = ref('')

// Open Modal
const openFundWallet = () => {
  fundWalletDialog.value = true
}

// Handle Funding Wallet (Mock)
const fundWallet = () => {
  console.log('Funding Wallet with ₦', amount.value)
  fundWalletDialog.value = false
}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}
</style>
