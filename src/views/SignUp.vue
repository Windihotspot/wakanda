<script setup>
import { ref } from 'vue'
import axios from 'axios'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false
})

// Define variables to store any form submission errors or success messages
const errorMessage = ref('')
const successMessage = ref('')

const handleSubmit = async (event) => {
  event.preventDefault() // Prevent the form from refreshing the page

  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {
    // Send the form data to your backend
    const response = await axios.post('https://your-backend-url.com/signup', {
      first_name: formData.value.firstName,
      last_name: formData.value.lastName,
      email: formData.value.email,
      password: formData.value.password
    })

    // If the signup is successful, show the success message
    successMessage.value = 'Signup successful! Please check your email to verify your account.'
    errorMessage.value = '' // Clear any previous errors
  } catch (error) {
    // If an error occurs, show an error message
    errorMessage.value = error.response?.data?.message || 'An error occurred. Please try again.'
    successMessage.value = '' // Clear any previous success messages
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Create an account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit="handleSubmit" class="space-y-6">
        <div>
          <label for="first-name" class="block text-sm font-medium text-gray-900">First Name</label>
          <div class="mt-2">
            <input
              type="text"
              id="first-name"
              v-model="formData.firstName"
              autocomplete="given-name"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
            />
          </div>
        </div>

        <div>
          <label for="last-name" class="block text-sm font-medium text-gray-900">Last Name</label>
          <div class="mt-2">
            <input
              type="text"
              id="last-name"
              v-model="formData.lastName"
              autocomplete="family-name"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              type="email"
              id="email"
              v-model="formData.email"
              autocomplete="email"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
          <div class="mt-2">
            <input
              type="password"
              id="password"
              v-model="formData.password"
              autocomplete="new-password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
            />
          </div>
        </div>

        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-900">
            Confirm Password
          </label>
          <div class="mt-2">
            <input
              type="password"
              id="confirm-password"
              v-model="formData.confirmPassword"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            v-model="formData.rememberMe"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <!-- Display success or error message -->
      <div v-if="successMessage" class="mt-6 text-center text-green-600">{{ successMessage }}</div>
      <div v-if="errorMessage" class="mt-6 text-center text-red-600">{{ errorMessage }}</div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</a>
      </p>
    </div>
  </div>
</template>
