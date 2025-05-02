<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <div class="flex flex-col items-center text-center">
        <p class="text-gray-500 text-sm mt-1">Create a new password for your account</p>
      </div>

      <!-- Alert -->
      <transition name="fade">
        <!-- Password Strength Message -->
        <div
          v-if="showDialog"
          class="fixed top-4 right-4 p-2 rounded-lg shadow-lg z-50"
        >
        <div class="flex items-center gap-2">
                                            <div class="flex-shrink-0">
                                                <svg
                                                    v-if="hasUppercase"
                                                    class="w-4 h-4 text-green-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M8 12L11 15L16 9"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <svg
                                                    v-else
                                                    class="w-4 h-4 text-red-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M15 9L9 15M9 9L15 15"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <span
                                                class="text-sm"
                                                :class="
                                                    hasUppercase
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                "
                                            >
                                                Uppercase letters
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="flex-shrink-0">
                                                <svg
                                                    v-if="hasLowercase"
                                                    class="w-4 h-4 text-green-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M8 12L11 15L16 9"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <svg
                                                    v-else
                                                    class="w-4 h-4 text-red-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M15 9L9 15M9 9L15 15"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <span
                                                class="text-sm"
                                                :class="
                                                    hasLowercase
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                "
                                            >
                                                Lowercase letters
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="flex-shrink-0">
                                                <svg
                                                    v-if="hasNumber"
                                                    class="w-4 h-4 text-green-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M8 12L11 15L16 9"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <svg
                                                    v-else
                                                    class="w-4 h-4 text-red-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M15 9L9 15M9 9L15 15"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <span
                                                class="text-sm"
                                                :class="
                                                    hasNumber
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                "
                                            >
                                                Numbers
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="flex-shrink-0">
                                                <svg
                                                    v-if="hasSpecialChar"
                                                    class="w-4 h-4 text-green-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M8 12L11 15L16 9"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <svg
                                                    v-else
                                                    class="w-4 h-4 text-red-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M15 9L9 15M9 9L15 15"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <span
                                                class="text-sm"
                                                :class="
                                                    hasSpecialChar
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                "
                                            >
                                                Special characters
                                            </span>
                                        </div>
        </div>
      </transition>

      <form @submit.prevent="onSubmit" class="mt-6">
        <div class="mb-4">
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Email new password"
            placeholder="Enter new password"
            variant="outlined"
            color="blue"
            class="mt-4"
            :error-messages="passwordError"
          >
            <template #append-inner>
              <i
                :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click="togglePasswordVisibility"
                class="cursor-pointer text-black"
              ></i>
            </template>
          </v-text-field>

          <v-text-field
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Confirm new password"
            placeholder="Confirm new password"
            variant="outlined"
            color="blue"
            class="mt-4"
            :error-messages="confirmPasswordError"
          >
            <template #append-inner>
              <i
                :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click="togglePasswordVisibility"
                class="cursor-pointer text-black"
              ></i>
            </template>
          </v-text-field>
        </div>

        <v-btn
          type="submit"
          class="w-full custom-btn hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition"
        >
          Reset Password
        </v-btn>
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
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const showDialog = ref(false)
const passwordMessage = ref('')

const hasUppercase = computed(() => /[A-Z]/.test(password));
const hasLowercase = computed(() => /[a-z]/.test(password));
const hasNumber = computed(() => /[0-9]/.test(password));
const hasSpecialChar = computed(() =>
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
);


const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'Email is required'
    return false
  } else if (!emailPattern.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return false
  }
  emailError.value = ''
  return true
}

const onSubmit = async () => {
  if (!validateEmail()) return

  try {
    const response = await axios.post('https://dev02201.getjupita.com/api/forgot-password', {})
    console.log('reset password response:', response)

    // ⏳ Wait a moment, then navigate
    setTimeout(() => {
      router.push('/')
    }, 3000)
  } catch (error) {}

  // Hide alert after 5 seconds
  setTimeout(() => {}, 5000)
}
</script>

<style scoped>
.custom-btn {
  background-color: #1f5aa3;
  text-transform: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
