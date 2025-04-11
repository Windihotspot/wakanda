<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <div class="flex flex-col items-center text-center">
        <h2 class="text-2xl font-semibold mt-4">Forgot password?</h2>
        <p class="text-gray-500 text-sm mt-1">No worries, we'll send you reset instructions.</p>
      </div>

      <form @submit.prevent="onSubmit" class="mt-6">
        <div class="mb-4">
          <v-text-field
            type="email"
            label="Email address"
            placeholder="Enter email address"
            variant="outlined"
            color="blue"
            class="mt-4"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
        >
          Reset password
        </button>
      </form>

      <div class="text-center mt-6">
        <RouterLink to="/">
          <v-btn
            no-uppercase
            variant="text"
            size="small"
            color="#1f5aa3"
            class="normal-case mb-1 text-none"
          >
            Back to Login
          </v-btn>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const router = useRouter()

const onSubmit = () => {
  if (!email.value || !email.value.includes('@')) {
    alert('Please enter a valid email.')
    return
  }

  // Simulate sending reset instructions
  console.log('Sending reset link to:', email.value)
  alert('Reset instructions sent to ' + email.value)
}

const goToLogin = () => {
  router.push('/login')
}
</script>
