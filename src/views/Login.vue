<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const showPassword = ref(false)

// Compute input type based on visibility
const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'))

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const loginForm = ref({
  email: '',
  password: '',
  remember: false,
  errors: {
    email: '',
    password: ''
  },
  processing: false
})
// Handle Login Submission
const submitForm = async () => {
  loginForm.value.processing = true
  loginForm.value.errors = {} // Clear previous errors

  try {
    const response = await axios.post('https://app.getjupita.com/api/login', {
      email: loginForm.value.email,
      password: loginForm.value.password
    })

    console.log('Login successful:', response.data)
    // Extract data from the response properly
    const { token, user, verification_status } = response.data.data // data is the root response object

    // Pass the data correctly to the store
    authStore.setAuthData({ token, verification_status, user })

    console.log('Store after login:', {
      tenant_id: authStore.tenant_id,
      token: authStore.token,
      verification_status: authStore.verification_status,
      user: authStore.user
    })

    router.push('/dashboard')

    // Handle success (e.g., store token, redirect user)
  } catch (error) {
    console.log('Login failed:', error.response?.data)

    // Handle errors
    if (error.response?.data?.errors) {
      loginForm.value.errors = error.response.data.errors
    } else {
      loginForm.value.errors.email = 'Invalid email or password'
    }
  } finally {
    loginForm.value.processing = false
  }
}

const images = [
  'https://images.unsplash.com/photo-1705948354275-d55101017fb6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNyZWRpdCUyMHNlYXJjaHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1654263937085-48fb17a63d66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNyZWRpdCUyMHNlYXJjaHxlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1702634273888-1999beb6120b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmlnZXJpYW4lMjBidXNpbmVzcyUyMHdvbWFuJTIwbWFya2V0fGVufDB8fDB8fHww'
]

const currentImage = ref(images[0])
const showImage = ref(true)
let intervalId

const changeImage = () => {
  showImage.value = false // Start fade-out transition

  setTimeout(() => {
    const currentIndex = images.indexOf(currentImage.value)
    currentImage.value = images[(currentIndex + 1) % images.length]
    showImage.value = true // Start fade-in transition
  }, 500) // Match with CSS transition duration
}

onMounted(() => {
  intervalId = setInterval(changeImage, 6000) // 3 minutes
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="flex flex-col md:flex-row h-auto md:h-screen bg-white">
    <!-- Logo -->
    <div>
      <div class="m-4 md:absolute">
        <img src="/src/assets/images/white.png" class="m-2" />
      </div>
    </div>
    <!-- Left Section -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
      <div>
        <!-- Login form -->
        <div class="max-w-md w-full">
          <h1 class="text-3xl font-bold text-gray-800">Welcome back!</h1>
          <p class="text-gray-600 mt-2">Provide your login credentials to access your account</p>

          <div class="mt-4 space-y-4">
            <v-text-field
              type="email"
              label="Email address"
              v-model="loginForm.email"
              variant="outlined"
              color="blue"
            />
            <p v-if="loginForm.errors.email" class="text-red-500 text-sm">
              {{ loginForm.errors.email }}
            </p>
            <div class="relative">
              <v-text-field
                type="password"
                v-model="loginForm.password"
                label="Password"
                variant="outlined"
                color="blue"
              />

              <span
                class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black-200"
                @click="togglePasswordVisibility"
              >
                <v-icon v-if="showPassword" class="text-xs">mdi-eye-off</v-icon>
                <v-icon v-else class="text-xs">mdi-eye</v-icon>
              </span>
              <p v-if="loginForm.errors.password" class="text-red-500 text-sm">
                {{ loginForm.errors.password }}
              </p>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  v-model="loginForm.remember"
                  type="checkbox"
                  id="remember"
                  class="h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label for="remember" class="ml-1 block text-sm text-gray-900">
                  Keep me signed in
                </label>
              </div>
              <span class="text-sm text-blue-600 ml-auto">Reset Password</span>

              <div class="text-sm">
                <span class="font-semibold text-blue-600 hover:text-blue-500"> </span>
              </div>
            </div>

            <v-btn
              @click="submitForm"
              :disabled="loginForm.processing"
              no-uppercase
              size="large"
              class="normal-case w-full p-4 bg-blue-600 hover:bg-blue-700 text-white text-none mr-2 custom-btn"
            >
              {{ loginForm.processing ? 'Signing in...' : 'Sign in' }}
            </v-btn>
          </div>

          <div class="relative flex justify-center text-sm mt-4">
            <span class="px-2 text-gray-500">Or continue with</span>
          </div>

          <p class="mt-6 text-center text-sm text-gray-500">
            Don't have an account?

            <RouterLink to="/signup">
              <v-btn
                no-uppercase
                variant="text"
                size="small"
                color="blue"
                class="normal-case mb-1 text-white text-none"
              >
                Create an account
              </v-btn>
            </RouterLink>
          </p>
        </div>
      </div>
    </div>

    <!-- Right Section (Changing Images) -->
    <div class="hidden md:block w-1/2 relative p-4 m-4">
      <img
        src="/src/assets/image.jpg"
        alt="Onboarding Image"
        class="w-full h-full object-cover absolute inset-0 rounded-lg shadow-2xl"
        key="image"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.4s ease-in-out,
    opacity 0.4s;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.custom-btn {
  background-color: #0056d2;
}
</style>
