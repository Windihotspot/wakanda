<!-- ConfettiSuccessModal.vue -->
<template>
    <Teleport to="body">
      <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
          <i class="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
          <h2 class="text-xl font-bold text-gray-800">Upload Successful!</h2>
          <p class="text-gray-600 mt-2">Your file has been uploaded successfully.</p>
          <button @click="close" class="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import confetti from 'canvas-confetti'
  
  const props = defineProps({
    visible: Boolean
  })
  const emit = defineEmits(['close'])
  
  onMounted(() => {
    if (props.visible) {
      // Trigger confetti once the modal is shown
      const duration = 3 * 1000
      const end = Date.now() + duration
  
      ;(function frame() {
        confetti({ particleCount: 5, spread: 100, origin: { y: 0.6 } })
        if (Date.now() < end) requestAnimationFrame(frame)
      })()
    }
  })
  
  const close = () => emit('close')
  </script>
  