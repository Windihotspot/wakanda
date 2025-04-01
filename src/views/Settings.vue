<template>
  <MainLayout>
    <v-container class="p-6 min-h-screen">
      <h1 class="text-2xl font-semibold text-blue-800 mb-6">Settings</h1>
      <v-card class="pa-4">
        <v-tabs v-model="activeTab" color="blue" align-tabs="center">
          <v-tab value="profile">Profile</v-tab>
          <v-tab value="team">Team</v-tab>
          <v-tab value="api">API Settings</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <!-- Profile Section -->
          <v-window-item value="profile">
            <div class="p-6">
              <h2 class="text-xl font-semibold mb-6">Personal Information</h2>
              <div class="grid grid-cols-2 gap-4">
                <v-text-field
                  v-model="profile.fullName"
                  label="Full Name"
                  variant="outlined"
                  color="blue"
                />
                <v-text-field
                  v-model="profile.phone"
                  label="Phone Number"
                  variant="outlined"
                  color="blue"
                />
                <v-text-field
                  v-model="profile.email"
                  label="Email Address"
                  readonly
                  variant="outlined"
                />
                <v-select
                  v-model="profile.role"
                  :items="roles"
                  label="Role"
                  variant="outlined"
                  color="blue"
                />
              </div>
              <v-text-field label="Password" variant="outlined" />
              <v-btn class="mt-4 ml-auto" color="primary" @click="saveProfile">Save changes</v-btn>
            </div>
          </v-window-item>

          <!-- Team Section -->
          <v-window-item value="team">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold mb-4">Users</h2>

                <v-btn @click="openModal" class="mt-4" color="primary">Invite User</v-btn>
              </div>

              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">S/N</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Role</th>
                    <th class="text-left">Creation Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td class="text-green-600 font-semibold">{{ user.status }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.creationDate }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-window-item>

          <!-- API Settings Section -->
          <v-window-item value="api">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4">API Credentials</h2>
              <div class="grid grid-cols-2 gap-4">
                <v-text-field
                  v-model="api.clientId"
                  label="API Client ID"
                  variant="outlined"
                  color="blue"
                  readonly
                >
                </v-text-field>
                <v-text-field
                  v-model="api.secretKey"
                  label="API Secret Key"
                  type="password"
                  readonly
                  variant="outlined"
                  color="blue"
                >
                </v-text-field>
              </div>

              <v-btn variant="plain" class="mt-4" color="primary">View API Documentation</v-btn>
            </div>
          </v-window-item>
        </v-window>
      </v-card>

      <v-dialog v-model="showModal" persistent max-width="500px" class="pa-4">
        <v-container class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg pa-6">
          <h2 class="text-lg font-bold text-blue-600 mb-6">New User</h2>
          <form action="">
            <v-text-field label="Full Name" variant="outlined" color="blue" />
            <v-text-field label="Email address" variant="outlined" color="blue" />
            <v-text-field label="Phone number" variant="outlined" color="blue" />

            <v-select
              v-model="profile.role"
              :items="roles"
              label="Role"
              variant="outlined"
              color="blue"
            />

            <v-btn color="blue" class="w-full bg-blue-600 text-white mt-4 custom-btn" @click="uploadFile">
              Invite User
            </v-btn>
          </form>
        </v-container>
      </v-dialog>
    </v-container>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import MainLayout from '@/layouts/full/MainLayout.vue'
const activeTab = ref('profile')

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const profile = ref({
  fullName: 'Williams Adeyemi',
  phone: '09065512525',
  email: 'wadeyemi@getjupita.com',
  role: 'Super Admin'
})

const roles = ['User', 'Admin', 'Super Admin']

const users = ref([
  {
    name: 'Almadeisojfh hdjdkdflL.pdf',
    email: 'williams@getjupita.com',
    status: 'Active',
    role: 'Owner',
    creationDate: 'Dec 21, 2024 11:05PM'
  },
  {
    name: 'Almadeisojfh hdjdkdflL.pdf',
    email: 'williams@getjupita.com',
    status: 'Active',
    role: 'Super Admin',
    creationDate: 'Dec 21, 2024 11:05PM'
  },
  {
    name: 'Almadeisojfh hdjdkdflL.pdf',
    email: 'williams@getjupita.com',
    status: 'Active',
    role: 'Super Admin',
    creationDate: 'Dec 21, 2024 11:05PM'
  }
])

const api = ref({
  clientId: 'jupita-sofimfb-api',
  secretKey: '**********'
})

const saveProfile = () => {
  alert('Profile saved successfully!')
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  alert('Copied to clipboard!')
}
</script>

<style scoped>
.custom-btn{
    text-transform: none !important;
}
.v-card {
  border-radius: 12px;
}
.v-tab {
  text-transform: none !important;
}
</style>
