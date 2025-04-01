<template>
  <v-container class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-xl font-bold text-blue-600 mb-6">Upload A PDF Statement</h2>

    <!-- Drag and Drop Area -->
    <div
      class="border-dashed border-2 border-blue-400 p-8 text-center rounded-lg mb-4 cursor-pointer"
      :class="{ 'bg-blue-50 border-blue-600': isDragging }"
      @click="triggerFileInput"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input ref="fileInput" type="file" accept=".pdf" class="hidden" @change="onFileSelect" />

      <v-icon size="48" class="text-blue-500">mdi-cloud-upload</v-icon>
      <p class="text-gray-700 font-medium">
        Drag 'n' drop your file here, or
        <span class="text-blue-600 cursor-pointer underline">Open File Dialog</span>
      </p>
      <p class="text-gray-500 text-sm mt-2">MAX FILE SIZE: 10MB | FILE SUPPORTED: PDF</p>
    </div>

    <!-- Selected File Info -->
    <div v-if="selectedFile" class="border rounded-lg p-4">
      <div class="flex justify-between items-center mb-3">
        <div class="flex items-center gap-2">
          <v-icon>mdi-file-pdf-box</v-icon>
          <p class="text-gray-700 text-sm">{{ selectedFile.name }} ({{ fileSize }} MB)</p>
        </div>

        <v-icon @click="removeFile" class="text-red">mdi-trash-can-outline</v-icon>
      </div>

      <p class="text-gray-600 text-sm font-semibold mb-2">Select a Statement Type</p>
      <v-radio-group v-model="statementType" row class="grid grid-cols-3 gap-4">
        <v-radio color="blue" label="Consumer" value="consumer"></v-radio>
        <v-radio label="Business" value="business"></v-radio>
        <v-radio label="Mobile Money" value="mobile-money"></v-radio>
        <v-radio label="Mobile Money Business" value="mobile-money-business"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="filePassword"
        label="File Password (optional)"
        variant="outlined"
        class="mt-2"
      ></v-text-field>
    </div>

    <v-btn
      :disabled="!selectedFile"
      color="blue"
      class="w-full bg-blue-600 text-white mt-4"
      @click="uploadFile"
    >
      Upload
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
const loading = ref(false)
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTguMjEyLjg2LjIzOS9hcGkvcmVnaXN0ZXItYnVzaW5lc3MiLCJpYXQiOjE3NDM1MDI5NzgsImV4cCI6MTc0MzUwNjU3OCwibmJmIjoxNzQzNTAyOTc4LCJqdGkiOiI1VUE3OFJrTWtaaHMwN1d4Iiwic3ViIjoiMzI3YjU1NDQtNjE3My00ZWMzLTlkN2EtNDE5ZDE4NDEwZGIzIiwicHJ2IjoiNDMyNjMzNzVmN2ZmZDZhMmNlNWYzOGJlOTM4ZmQxMmUzZjA3OWZhZSJ9.0AGgJ2DheMMFlcdhLtbmtnLNR04fGfDYeMz1ZphmliU"
const selectedFile = ref(null)
const filePassword = ref('')
const statementType = ref('')
const fileInput = ref(null)
const isDragging = ref(false)

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  validateFile(file)
}

const fileSize = computed(() =>
  selectedFile.value ? (selectedFile.value.size / 1024 / 1024).toFixed(2) : '0'
)

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
  }
}

const removeFile = () => {
  selectedFile.value = null
}

const API_URL =
  'http://18.212.86.239/api/7188d42a-b70a-4732-8447-1d665df93b9f/bank-statement-analyze'

const uploadFile = async () => {
  if (!selectedFile.value || !statementType.value) {
    Swal.fire('Missing Information', 'Select a statement type and file.', 'warning')
    return
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('statementType', statementType.value)
  if (filePassword.value) {
    formData.append('password', filePassword.value)
  }

  const API_URL =
    'http://18.212.86.239/api/7188d42a-b70a-4732-8447-1d665df93b9f/bank-statement-analyze'

  console.log('➡️ Uploading file...')
  for (const [key, value] of formData.entries()) {
    console.log(`   📌 ${key}:`, value instanceof Blob ? value.name : value)
  }

  try {
    loading.value = true

    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    console.log('✅ Success:', response)
    Swal.fire('Success', 'File uploaded successfully!', 'success')

    // Reset input values
    selectedFile.value = null
    filePassword.value = ''
    statementType.value = ''
    bearerToken.value = '' // Clear token field after upload
  } catch (error) {
    console.error('❌ Upload error:', error)
    Swal.fire('Upload Failed', error.response?.data?.message || 'An error occurred.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
