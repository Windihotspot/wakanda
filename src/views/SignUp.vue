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
    const response = await axios.post('http://localhost:3000/api/routes/signup', {
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
  <div class="flex  flex-col justify-center px-6  lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-lg">
      
      <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Create an account
      </h2>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <v-container class="d-flex justify-center align-center fill-height">
        <v-card class="pa-6" max-width="500">
         
          <v-card-text>
            <v-form @submit.prevent="handleSubmit" v-slot="{ valid }">
              <v-text-field v-model="formData.firstName" label="First Name" required variant="outlined" />
              <v-text-field v-model="formData.lastName" label="Last Name" required  variant="outlined" />
              <v-text-field
                v-model="formData.email"
                label="Email Address"
                type="email"
                required
                 variant="outlined"
              />
              <v-text-field
                v-model="formData.password"
                label="Password"
                type="password"
                required
                variant="outlined"
              />
              <v-text-field
                v-model="formData.confirmPassword"
                label="Confirm Password"
                type="password"
                required
               variant="outlined"
               
              />
              <v-checkbox v-model="formData.rememberMe" label="Remember Me" />
              <v-btn  :disabled="!valid" type="submit" color="primary" block> Sign Up </v-btn>
            </v-form>
            <!-- Display success or error messages -->
            <v-alert v-if="successMessage" type="success" class="mt-4" dense>
              {{ successMessage }}
            </v-alert>
            <v-alert v-if="errorMessage" type="error" class="mt-4" dense>
              {{ errorMessage }}
            </v-alert>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn text href="#">Already have an account? Sign in</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>

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
