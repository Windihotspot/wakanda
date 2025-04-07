<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
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
          <i class="fas fa-file-pdf text-red-600"></i>
          <p class="text-gray-700 text-sm">{{ selectedFile.name }} ({{ fileSize }} MB)</p>
        </div>

        <i class="fas fa-trash-alt text-red-600 cursor-pointer" @click="removeFile"></i>
      </div>

      <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
        <v-progress-circular  indeterminate color="green" class="mx-auto my-4" />
      </div>
    

      <p class="text-gray-600 text-sm font-semibold mb-2">Select a Statement Type</p>
      <div class="mb-4">
        <div class="mb-4">
          <div
            v-for="(type, index) in statementTypes"
            :key="index"
            class="flex items-center mt-4 space-x-3 p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
          >
            <input
              type="radio"
              :id="type.value"
              :value="type.value"
              v-model="statementType"
              name="statement-type"
              class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label :for="type.value" class="text-gray-700 font-medium">
              {{ type.label }}
            </label>
          </div>
        </div>
      </div>

      <v-text-field
        v-model="filePassword"
        label="File Password (optional)"
        variant="outlined"
        class="mt-4"
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

    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
const loading = ref(false)
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const token = computed(() => authStore.token)
const tenantId = computed(() => authStore.tenant_id)
const emit = defineEmits(['close'])


const selectedFile = ref(null)
const filePassword = ref('')
const fileInput = ref(null)
const isDragging = ref(false)
const selectedTypes = ref(null)

const statementType = ref('')

const statementTypes = [
  { label: 'Consumer', value: 'consumer' },
  { label: 'Business', value: 'business' },
  { label: 'Mobile Money', value: 'mobile-money' },
  { label: 'Mobile Money Business', value: 'mobile-money-business' }
]

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

  const API_URL = `http://18.212.86.239/api/${tenantId.value}/bank-statement-analyze`

  console.log('➡️ Uploading file...')
  for (const [key, value] of formData.entries()) {
    console.log(`   📌 ${key}:`, value instanceof Blob ? value.name : value)
  }

  try {
    loading.value = true

    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    })

    console.log('✅ Success:', response)
    Swal.fire('Success', 'File uploaded successfully!', 'success')

   // Reset input values
   selectedFile.value = null
    filePassword.value = ''
    statementType.value = ''

    emit('close') 
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
