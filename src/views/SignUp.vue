<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const steps = [
  {
    title: 'Business details',
    description: 'Provide your business information',
    icon: 'fa-user'
  },
  {
    title: 'Verify your email',
    description: 'Enter your verification code',
    icon: 'fa-envelope'
  }
]

const currentStep = ref(0)

const showPassword = ref(false)

// Compute input type based on visibility
const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'))

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const registerForm = ref({
  business_name: '',
  business_email: '',
  phone_number: '',
  business_type: '',
  business_reg_number: '',
  password: ''
})

// Handle Registration Submission
const submitForm = async () => {
  registerForm.value.processing = true
  registerForm.value.errors = {} // Clear previous errors
  console.log('Registration request:', registerForm.value)

  try {
    const response = await axios.post('https://dev02201.getjupita.com/api/register-business', {
      business_name: registerForm.value.business_name,
      business_email: registerForm.value.business_email,
      phone_number: registerForm.value.phone_number,
      business_type: registerForm.value.business_type,
      business_reg_number: registerForm.value.business_reg_number,
      password: registerForm.value.password
    })

    console.log('Registration successful:', response.data)
    // Store authentication data in Pinia
    authStore.setAuthData(response.data.data)
    // Move to the next step
    currentStep.value += 1

    // Show the step for 3 seconds, then navigate
    setTimeout(() => {
      router.push('/verified')
    }, 3000)

    // Handle success (e.g., store token, redirect user)
  } catch (error) {
    console.log('Registration failed:', error.response?.data)

    // Handle errors
    if (error.response?.data?.errors) {
      registerForm.value.errors = error.response.data.errors
    } else {
    }
  } finally {
    registerForm.value.processing = false
  }
}

const showDialog = ref(false)
const passwordMessage = ref('')

// Compute password strength
const strength = computed(() => {
  const password = registerForm.password
  let score = 0
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++
  if (password.length >= 8) score++

  if (score === 5) return 'Strong'
  if (score >= 3) return 'Medium'
  return 'Weak'
})

// Watch for password changes
const checkPasswordStrength = () => {
  const password = registerForm.password
  if (!password) {
    showDialog.value = false
    return
  }
  showDialog.value = true
  passwordMessage.value =
    strength.value === 'Strong'
      ? '✅ Strong password!'
      : strength.value === 'Medium'
        ? '⚠️ Medium strength, add more characters or symbols.'
        : '❌ Weak password! Use uppercase, numbers, and symbols.'
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
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/3 justify-center p-4 items-center bg-white shadow-xl">
      <!-- Logo -->
      <img src="/src/assets/images/white.png" class="m-2" />
      <ul class="space-y-6 mt-6 ml-4">
        <li
          v-for="(step, index) in steps"
          :key="index"
          @click="goToStep(index)"
          class="flex items-center space-x-3 cursor-pointer transition"
          :class="index <= currentStep ? 'text-black' : 'text-gray-400 cursor-not-allowed'"
        >
          <i
            :class="[
              'fas',
              step.icon,
              'text-lg',
              index === currentStep ? 'text-blue-600' : 'text-blue-600'
            ]"
          ></i>
          <div>
            <p :class="[index === currentStep ? 'font-semibold' : 'text-gray-500']">
              {{ step.title }}
            </p>
            <p class="text-sm text-gray-400">
              {{ step.description }}
            </p>
          </div>
        </li>
      </ul>

      <div class="absolute bottom-8 left-8 flex space-x-4 text-gray-500">
        <RouterLink to="/login">
          <v-btn
            no-uppercase
            variant="text"
            size="large"
            color="blue"
            class="normal-case w-full p-4 text-white text-none mr-2"
          >
            Sign in
            <i class="fa-solid fa-arrow-right ml-4 mt-1"></i>
          </v-btn>
        </RouterLink>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-1/2 relative p-4 m-4 bg-white">
      <!-- Business Details Form -->
      <div
        class="max-w-md w-full items-center justify-center flex text-center"
        v-if="currentStep === 0"
      >
        <div class="space-y-4 items-center justify-center">
          <input
            v-model="registerForm.business_name"
            type="text"
            placeholder="Business name"
            class="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-100"
          />

          <input
            v-model="registerForm.business_reg_number"
            type="text"
            placeholder="Business registeration number"
            class="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-100"
          />

          <input
            v-model="registerForm.business_type"
            type="text"
            placeholder="Business type"
            class="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-100"
          />

          <input
            v-model="registerForm.business_email"
            type="email"
            placeholder="Email address"
            class="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-100"
          />

          <input
            v-model="registerForm.phone_number"
            type="text"
            placeholder="Mobile number"
            class="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-100"
          />

          <div class="grid grid-cols-2 gap-4">
            <div class="relative">
              <input
                v-model="registerForm.password"
                @input="checkPasswordStrength"
                :type="passwordInputType"
                placeholder="Password"
                class="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-100"
              />
              <span
                class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black-200"
                @click="togglePasswordVisibility"
              >
                <v-icon v-if="showPassword" class="text-xs">mdi-eye-off</v-icon>
                <v-icon v-else class="text-xs">mdi-eye</v-icon>
              </span>
            </div>

            <!-- <div class="relative">
                          <input
                              v-model="registerForm.password_confirmation"
                              :type="passwordInputType"
                              placeholder="Confirm Password"
                              class="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-100"
                          />
                          <span
                              class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black-200"
                              @click="togglePasswordVisibility"
                          >
                              <v-icon v-if="showPassword" class="text-md"
                                  >mdi-eye-off</v-icon
                              >
                              <v-icon v-else class="text-md">mdi-eye</v-icon>
                          </span>
                      </div> -->
            <p v-if="passwordsDoNotMatch" class="text-red-500 text-sm">Passwords do not match</p>
          </div>

          <div class="flex mb-4">
            <input
              v-model="registerForm.terms"
              type="checkbox"
              id="terms"
              required
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <v-btn
            @click="submitForm"
            :disabled="registerForm.processing"
            no-uppercase
            size="large"
            class="normal-case ml-auto w-full p-4 bg-blue-600 hover:bg-blue-700 text-white text-none mr-2 custom-btn"
          >
            {{ registerForm.processing ? 'Creating account...' : 'Next Step' }}
          </v-btn>
        </div>
      </div>

      <!-- Email Verification Section -->
      <div v-if="currentStep === 1" class="mt-6 p-6 w-full">
        <div class="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <div class="text-blue-500 text-6xl mb-4">
            <i class="fas fa-envelope"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
          <p class="text-gray-600 mb-6">
            We have sent a verification link to your email address. Please check your inbox and
            click on the link to verify your account.
          </p>
          <v-btn
            no-uppercase
            size="large"
            class="normal-case w-full p-4 bg-blue-600 hover:bg-blue-700 text-white text-none mr-2 custom-btn"
          >
            Resend email
          </v-btn>
          <p class="text-gray-500 text-sm mt-4">
            Didn't receive an email? Check your spam folder or
            <a href="#" class="text-blue-500 hover:underline">contact support</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-btn {
  background-color: #0056d2;
}
</style>
