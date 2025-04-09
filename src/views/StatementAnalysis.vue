<template>
    <MainLayout>
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4">Statement Analysis Result</h2>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="text-red-600">{{ error }}</div>
        <pre v-else class="bg-gray-100 p-4 rounded">{{ JSON.stringify(result, null, 2) }}</pre>
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
  
  const token = computed(() => authStore.token)
  const tenantId = computed(() => authStore.tenant_id)
  
  const result = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  const fetchAnalysisResult = async (analysisId) => {
    const apiUrl = `https://dev02201.getjupita.com/api/${tenantId.value}/get-analysis-result?analysis_id=${analysisId}`
  
    try {
      const response = await Axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json'
        }
      })
      console.log("statement analysis result page data:", response)
      result.value = response.data
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
  