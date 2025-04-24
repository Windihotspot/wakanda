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
                    <p class="font-semibold text-gray-800 text-lg">
                      {{ formatCurrency(highestSpend) }}
                    </p>
                    <p class="text-sm font-semibold text-gray-600 mt-1">
                      Transaction Date: {{ monthWithHighestSpend }}
                    </p>
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
                  <h2 class="text-lg font-semibold text-gray-800 m-4">Expenses</h2>
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

              <!-- Cash flow-->
              <v-tabs-window-item value="cash flow">
                <div class="flex flex-col md:flex-row gap-4 text-center text-gray-500 py-10">
                  <!-- Inflow Summary -->
                  <div class="flex-1 bg-white border p-6 rounded-xl shadow">
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
                  <div class="flex-1 bg-white border p-6 rounded-xl shadow">
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

                <div class="flex gap-4 justify-between p-2">
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

                <div class="p-2 rounded-lg shadow-md">
                  <h2 class="text-lg font-semibold text-gray-800 mb-2 mt-2">
                    Credit & Debit Summary
                  </h2>
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
                          <tfoot class="font-semibold text-gray-800 bg-gray-50 border-t">
                            <tr>
                              <td class="px-2 py-2">Total</td>
                              <td class="px-2 text-green-800 py-2">{{ formatCurrency(totalMonthlyCredit) }}</td>
                              <td class="px-2 text-red-800 py-2">{{ formatCurrency(totalMonthlyDebit) }}</td>
                            </tr>
                          </tfoot>
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
                              <td class="px-2  py-2">{{ formatCurrency(entry.credit) }}</td>
                              <td class="px-2  py-2">{{ formatCurrency(entry.debit) }}</td>
                            </tr>
                          </tbody>
                          <tfoot class="font-semibold text-gray-800 bg-gray-50 border-t">
                            <tr>
                              <td class="px-2 py-2">Total</td>
                              <td class="px-2 text-green-800 py-2">{{ formatCurrency(totalWeeklyCredit) }}</td>
                              <td class="px-2 text-red-800 py-2">{{ formatCurrency(totalWeeklyDebit) }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </v-tabs-window-item>

              <!-- Behavioral -->
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
                        ><span>{{ loanRepaymentDate }}</span>
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
                        <span>Number of Betting Transactions</span><span>{{ gamblingStatus }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Gambling Rate</span><span>{{ gamblingRate }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Percentage of Debit Transactions</span
                        ><span>{{ percentOfDebit }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Percentage of Credit Transactions</span
                        ><span>{{ percentOfCredit }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Percentage of Transactions between 500k - 1M</span
                        ><span>{{ percentOfTransactionsBetween500ThousandToOneMillionNaira }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Percentage of Transactions Greater Than 1M</span
                        ><span>{{ percentOfTransactionsGreaterThanOneMillionNaira }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Most Frequent Balance Range</span
                        ><span>{{ mostFrequentBalanceRange }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Transfers -->
                <div class="flex flex-wrap gap-4 justify-between mt-4">
                  <!-- Self Transfers Card -->
                  <div class="bg-[#2059a5] text-white p-6 rounded-2xl w-full md:w-[48%] shadow">
                    <div class="grid grid-cols-3 gap-4 text-sm md:text-base">
                      <div></div>
                      <div class="text-center font-medium">Outflow</div>
                      <div class="text-center font-medium">Inflow</div>

                      <div class="text-left">Number of Self Transfers</div>
                      <div class="text-center font-semibold">
                        {{ numberOfSelfTransfersOutflows }}
                      </div>
                      <div class="text-center font-semibold">
                        {{ numberOfSelfTransfersInflows }}
                      </div>

                      <div class="text-left">Value of Self Transfers</div>
                      <div class="text-center font-semibold">
                        {{ formatCurrency(selfTransferOutflowAmount) }}
                      </div>
                      <div class="text-center font-semibold">
                        {{ formatCurrency(selfTransferInflowAmount) }}
                      </div>
                    </div>
                  </div>

                  <!-- Total Transactions and Returned Cheque Card -->
                  <div class="bg-[#2059a5] text-white p-6 rounded-2xl w-full md:w-[48%] shadow">
                    <div class="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div class="text-2xl font-bold">{{ totalNumberOfTransactions }}</div>
                        <div class="text-sm">Total Transactions</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold">{{ returnCheque }}</div>
                        <div class="text-sm">Returned Cheque</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col md:flex-row gap-6 justify-between mt-4">
                  <!-- Self Transfer Transactions Table -->
                  <div class="w-full md:w-1/2">
                    <h3 class="font-semibold text-sm md:text-base mb-2">
                      Self Transfer Transactions
                    </h3>
                    <div class="bg-white rounded-xl border shadow p-4 max-h-96 overflow-y-auto">
                      <table class="w-full text-sm text-left">
                        <thead class="text-gray-600">
                          <tr>
                            <th class="py-2 px-4">Month</th>
                            <th class="py-2 px-4">Inflow</th>
                            <th class="py-2 px-4">Outflow</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- Empty state check -->
                          <tr v-if="!selfTableData || selfTableData.length === 0">
                            <td colspan="3" class="text-center py-4 text-gray-500">
                              No data available
                            </td>
                          </tr>
                          <!-- Data rows -->
                          <tr
                            v-for="(item, index) in selfTableData"
                            :key="index"
                            class="border-b last:border-none"
                          >
                            <td class="py-2 px-4">{{ item.month }}</td>
                            <td class="py-2 px-4">{{ formatCurrency(item.inflow) }}</td>
                            <td class="py-2 px-4">{{ formatCurrency(item.outflow) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- Account Balance Analysis Table -->
                  <div class="w-full md:w-1/2">
                    <h3 class="font-semibold text-sm md:text-base mb-2">
                      Account Balance Analysis
                    </h3>
                    <div class="bg-white border rounded-xl shadow p-4 max-h-96 overflow-y-auto">
                      <table class="w-full text-sm text-left">
                        <thead class="text-gray-600">
                          <tr>
                            <th class="py-2 px-4">Month</th>
                            <th class="py-2 px-4">Highest Balance</th>
                            <th class="py-2 px-4">Lowest Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in monthlyBalance" :key="index">
                            <td class="py-2 px-4">{{ item.month }}</td>
                            <td class="py-2 px-4">{{ formatCurrency(item.highest) }}</td>
                            <td class="py-2 px-4">{{ formatCurrency(item.lowest) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </v-tabs-window-item>
              <v-tabs-window-item value="transactions">
                <div class="py-4">
                  <v-card class="rounded-lg shadow-md">
                    <v-card-title class="d-flex justify-between items-center px-6 py-4">
                      <span class="text-2xl font-semibold">Transaction History</span>

                      <!-- Font Awesome Filter Icon -->
                      <v-btn @click="showFilter = true" icon variant="text">
                        <i class="fas fa-filter text-black-600 text-lg"></i>
                      </v-btn>
                    </v-card-title>

                    <v-table class="min-w-full text-sm pa-4">
                      <thead class="font-semibold text-gray-600">
                        <tr>
                          <th class="px-2 py-3 font-semibold">S/N</th>
                          <th class="px-2 py-3 font-semibold">Date</th>
                          <th class="px-2 py-3 font-semibold">Description</th>
                          <th class="px-2 py-3 font-semibold">Type</th>
                          <th class="px-2 py-3 font-semibold">Amount</th>
                          <th class="px-2 py-3 font-semibold">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(txn, index) in transactions"
                          :key="index"
                          class="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td class="px-2 py-4">{{ index + 1 }}</td>
                          <td class="px-2 py-4">{{ formatDate(txn.date) }}</td>
                          <td class="px-2 py-4">{{ txn.description }}</td>
                          <td
                            class="px-6 py-4 font-semibold"
                            :class="txn.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'"
                          >
                            {{ txn.type }}
                          </td>

                          <td class="px-2 py-4">{{ formatCurrency(txn.amount) }}</td>
                          <td class="px-2 py-4">{{ formatCurrency(txn.balance) }}</td>
                        </tr>
                      </tbody>
                    </v-table>

                    <v-card-actions class="justify-between px-6 py-4 text-sm text-gray-500">
                      <span>1–12 of 12</span>
                      <div class="flex items-center space-x-2">
                        <span>Rows per page:</span>
                        <v-select
                          :items="[15, 30, 45]"
                          v-model="rowsPerPage"
                          density="compact"
                          hide-details
                          class="w-20"
                          variant="outlined"
                        />
                        <v-btn icon density="comfortable">
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn icon density="comfortable">
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </div>
          <!-- Filter Drawer -->
          <v-navigation-drawer
            v-model="showFilter"
            location="right"
            temporary
            width="500"
            class="px-4 pt-6"
          >
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold">Filter Transactions</h2>
              <div icon @click="showFilter = false">
                <i class="fas fa-sign-out-alt"></i>
              </div>
            </div>

            <div class="space-y-4">
              <!-- Date Picker -->
              <div>
                <label class="text-sm font-medium">Date</label>
                <div class="flex gap-2 mt-1">
                  <!-- From Date -->
                  <v-menu
                    v-model="menuFrom"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                  >
                    <template #activator="{ props }">
                      <v-text-field
                        
                        label="From"
                        readonly
                        v-bind="props"
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-calendar"
                      />
                    </template>
                    <v-date-picker
                    class="vdp-small"
                      v-model="filters.dateRange[0]"
                      @update:modelValue="menuFrom = false"
                    />
                  </v-menu>

                  <!-- To Date -->
                  <v-menu
                    v-model="menuTo"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                  >
                    <template #activator="{ props }">
                      <v-text-field
                       
                        label="To"
                        readonly
                        v-bind="props"
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-calendar"
                      />
                    </template>
                    <v-date-picker
                      v-model="filters.dateRange[1]"
                      @update:modelValue="menuTo = false"
                    />
                  </v-menu>
                </div>
              </div>

              <!-- Description -->
              <div>
                <v-text-field
                  color="blue"
                  label="Description"
                  v-model="filters.description"
                  density="compact"
                  variant="outlined"
                  placeholder="Enter description"
                />
              </div>

              <!-- Type -->
              <div>
                <label class="text-sm font-medium">Type</label>
                <v-select
                  color="blue"
                  v-model="filters.type"
                  :items="['CREDIT', 'DEBIT']"
                  density="compact"
                  variant="outlined"
                  placeholder="Select type"
                />
              </div>

              <!-- Amount Range -->
              <div class="flex gap-2">
                <v-text-field
                  color="blue"
                  v-model="filters.minAmount"
                  label="Min Amount"
                  density="compact"
                  variant="outlined"
                  type="number"
                />
                <v-text-field
                  color="blue"
                  v-model="filters.maxAmount"
                  label="Max Amount"
                  density="compact"
                  variant="outlined"
                  type="number"
                />
              </div>

              <!-- Apply & Reset Buttons -->
              <div class="flex justify-end gap-2 mt-4">
                <v-btn @click="applyFilters" variant="tonal" color="primary">Apply</v-btn>
                <v-btn @click="resetFilters" variant="text" color="grey">Reset</v-btn>
              </div>
            </div>
          </v-navigation-drawer>
        </div>
      </template>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import Axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import MainLayout from '@/layouts/full/MainLayout.vue'
import moment from 'moment'
import { ElMessage, ElNotification } from 'element-plus'
import { saveAs } from 'file-saver'


const activeTab = ref('Summary')

const formatDate = (date) => {
  return moment(date).format('MMMM Do YYYY,')
}

function formatCurrency(number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(number || 0)
}
const rowsPerPage = ref(15)
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

const totalMonthlyCredit = computed(() =>
  monthlyData.value.reduce((sum, entry) => sum + entry.credit, 0)
)

const totalMonthlyDebit = computed(() =>
  monthlyData.value.reduce((sum, entry) => sum + entry.debit, 0)
)
const totalWeeklyCredit = computed(() =>
  weeklyData.value.reduce((sum, entry) => sum + entry.credit, 0)
)

const totalWeeklyDebit = computed(() =>
  weeklyData.value.reduce((sum, entry) => sum + entry.debit, 0)
)

const mostFrequentExpense = ref(0)
const mostFrequentExpenseAmount = ref(0)

const highestSpend = ref(0)
const monthWithHighestSpend = ref('')

const expenseItems = ref([])

const percentOfDebit = ref('')
const percentOfCredit = ref('')
const percentOfTransactionsBetween500ThousandToOneMillionNaira = ref('')
const percentOfTransactionsGreaterThanOneMillionNaira = ref('')
const mostFrequentBalanceRange = ref(0)
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
const loanRepayment = ref([])
const loanRepaymentDate = ref('')

const overallInflowToOutflowRate = ref('')
const percentOfInflowIrregularity = ref(0)
const monthToMonthInflowToOutflowRate = ref('')
const averageMonthlyLoanRepaymentAmount = ref(0)

const numberOfSelfTransfersInflows = ref(0)
const numberOfSelfTransfersOutflows = ref(0)

const selfTransferInflowAmount = ref(0)
const selfTransferOutflowAmount = ref(0)

const totalNumberOfTransactions = ref(0)
const returnCheque = ref(0)

const selfTableData = ref([])

const monthlyBalance = ref([])

const transactions = ref([])
const allTransactions = ref([])

// Function to format the balance range (e.g., "1000 - 100000")
const formatBalanceRange = () => {
  if (!range || !range.includes(' - ')) {
    return '₦0.00 - ₦0.00' // Return a fallback if the range format is invalid
  }

  const [lower, upper] = range.split(' - ').map((val) => parseFloat(val.trim()))

  if (isNaN(lower) || isNaN(upper)) {
    return '₦0.00 - ₦0.00' // Return fallback if parsing fails
  }

  return `${formatCurrency(lower)} - ${formatCurrency(upper)}`
}

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
    // Assign loanRepayment array
    loanRepayment.value = behavior.latestRepaymentTransaction || []

    // Get first object if it exists
    const firstRepayment = loanRepayment.value[0] || null

    // Format using moment in the script
    loanRepaymentDate.value = firstRepayment?.date
      ? moment(firstRepayment.date).format('MMM D, YYYY')
      : 'N/A'

    const latestLoan = behavior.latestLoanTransaction?.[0]
    latestLoanTransaction.value = latestLoan
      ? moment(latestLoan.date).format('MMMM D, YYYY')
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
    const pattern =
      response.data?.data?.analysis_result?.analysis_result?.transactionPatternAnalysis || {}
    console.log('pattern analysis:', pattern)

    percentOfDebit.value = (pattern.percentDebitTransactions * 100).toFixed(2) + '%'
    percentOfCredit.value = (pattern.percentDebitTransactions * 100).toFixed(2) + '%'
    percentOfTransactionsBetween500ThousandToOneMillionNaira.value =
      (pattern.percentOfTransactionsBetween500ThousandToOneMillionNaira * 100).toFixed(2) + '%'
    percentOfTransactionsGreaterThanOneMillionNaira.value =
      (pattern.percentOfTransactionsGreaterThanOneMillionNaira * 100).toFixed(2) + '%'
    mostFrequentBalanceRange.value = pattern.mostFrequentBalanceRange

    numberOfSelfTransfersInflows.value = pattern.noOfSelfTransferInflows
    numberOfSelfTransfersOutflows.value = pattern.noOfSelfTransferOutflows

    selfTransferInflowAmount.value = pattern.selfTransferInflowAmount
    selfTransferOutflowAmount.value = pattern.selfTransferOutflowAmount

    totalNumberOfTransactions.value = pattern.totalNumberOfTransactions
    returnCheque.value = pattern.returnCheque

    const selfTransferInflow = pattern.selfTransferInflowTransactionsByMonth || []
    const selfTransferOutflow = pattern.selfTransferOutflowTransactionsByMonth || []

    const selfTransferMap = new Map()

    // Helper to format "4-2024" to "Apr 2024"
    function formatMonth(dateString) {
      return moment(dateString, 'M-YYYY').format('MMM YYYY')
    }

    // Populate inflow data
    selfTransferInflow.forEach((item) => {
      const formattedMonth = formatMonth(item.date)
      selfTransferMap.set(formattedMonth, {
        month: formattedMonth,
        inflow: item.amount,
        outflow: 0
      })
    })

    // Populate outflow data, merge if exists
    selfTransferOutflow.forEach((item) => {
      const formattedMonth = formatMonth(item.date)
      if (selfTransferMap.has(formattedMonth)) {
        selfTransferMap.get(formattedMonth).outflow = item.amount
      } else {
        selfTransferMap.set(formattedMonth, {
          month: formattedMonth,
          inflow: 0,
          outflow: item.amount
        })
      }
    })

    // Convert map to array for the table
    selfTableData.value = Array.from(selfTransferMap.values()).sort(
      (a, b) => moment(a.month, 'MMM YYYY') - moment(b.month, 'MMM YYYY')
    )

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

    // set monthly balance
    const highest = cashFlow?.monthlyHighestBalance || []
    const lowest = cashFlow?.monthlyLowestBalance || []

    const monthlyBalanceMap = new Map()

    highest.forEach((item) => {
      const dateKey = `${item.month_name} ${item.year}`
      const formattedMonth = moment(dateKey, 'MMMM YYYY').format('MMM YYYY') // e.g., Jan 2024

      const key = `${item.month_name}-${item.year}`
      monthlyBalanceMap.set(key, {
        month: formattedMonth,
        highest: item.highest_balance,
        lowest: 0
      })
    })

    lowest.forEach((item) => {
      const dateKey = `${item.month_name} ${item.year}`
      const formattedMonth = moment(dateKey, 'MMMM YYYY').format('MMM YYYY')

      const key = `${item.month_name}-${item.year}`
      if (monthlyBalanceMap.has(key)) {
        monthlyBalanceMap.get(key).lowest = item.lowest_balance
      } else {
        monthlyBalanceMap.set(key, {
          month: formattedMonth,
          highest: 0,
          lowest: item.lowest_balance
        })
      }
    })

    monthlyBalance.value = Array.from(monthlyBalanceMap.values())

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

const fetchTransactions = async () => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
  const analysisId = route.params.id

  const apiUrl = `https://dev02201.getjupita.com/api/${tenantId}/get-statement-transactions?analysis_id=${analysisId}`

  try {
    const response = await Axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('fetch transactions response:', response)
    allTransactions.value = response.data.data.transactions
    transactions.value = [...allTransactions.value]
  } catch (error) {
    console.error(error)
  }
}

const menuFrom = ref(false)
const menuTo = ref(false)

const filters = reactive({
  dateRange: [null, null] // [From, To]
})

const formattedDateFrom = computed(() => formatDate(filters.dateRange[0]))
const formattedDateTo = computed(() => formatDate(filters.dateRange[1]))
const showFilter = ref(false)

const resetFilters = () => {
  filters.value = {
    dateFrom: '',
    dateTo: '',
    description: '',
    type: 'All',
    amountMin: '',
    amountMax: ''
  }
}


const applyFilters = () => {
  transactions.value = allTransactions.value.filter((txn) => {
    const matchesDescription =
      !filters.description ||
      txn.description.toLowerCase().includes(filters.description.toLowerCase())

    const txnDate = new Date(txn.date)
    const fromDate = filters.dateRange[0] ? new Date(filters.dateRange[0]) : null
    const toDate = filters.dateRange[1] ? new Date(filters.dateRange[1]) : null

    const inDateRange = (!fromDate || txnDate >= fromDate) && (!toDate || txnDate <= toDate)

    return matchesDescription && inDateRange
  })

  showFilter.value = false
}

onMounted(() => {
  fetchTransactions()
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

  try {
    // Show persistent notification
    ElNotification({
      title: 'Downloading',
      message: 'Getting your analysis report...',
      type: 'info',
      duration: 3000
    })

    const response = await Axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const download = response?.data?.data?.download

    if (!download?.document_url || !download?.document_name) {
      throw new Error('No download information or document URL found in the response.')
    }

    const fileUrl = download.document_url

    // Sanitize and create filename from clientName
    const baseName = 'analysis_report'
    const correctFileName = `${baseName}.pdf`

    // Download blob
    const fileBlobResponse = await Axios.get(fileUrl, {
      responseType: 'blob'
    })

    saveAs(fileBlobResponse.data, correctFileName)

    // Success notification
    ElNotification({
      title: 'Success',
      message: 'Analysis report downloaded successfully.',
      type: 'success',
      duration: 6000
    })
  } catch (error) {
    console.error('Download failed:', error)

    ElNotification({
      title: 'Error',
      message: 'Failed to download analysis. Please try again.',
      type: 'error',
      duration: 6000
    })
  }
}
</script>

<style scoped>
.vdp-small {
  font-size: 0.8rem;
  max-width: 400px; /* adjust as needed */
}
.vdp-small .v-date-picker-table {
  padding: 8px;
}
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
.v-tab {
  text-transform: none !important;
}
</style>
