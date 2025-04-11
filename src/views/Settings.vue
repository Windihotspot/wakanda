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
                  v-model="profile.firstname"
                  label="First Name"
                  variant="outlined"
                  color="blue"
                />
                <v-text-field
                  v-model="profile.lastname"
                  label="Last Name"
                  variant="outlined"
                  color="blue"
                />
                <v-text-field
                  v-model="profile.phone_number"
                  label="Phone Number"
                  variant="outlined"
                  color="blue"
                />
                <v-text-field v-model="email" label="Email Address" variant="outlined" />
                <v-select
                  v-model="selectedRole"
                  :items="roles"
                  item-title="label"
                  item-value="value"
                  label="Select Role"
                  variant="outlined"
                  color="blue"
                  dense
                  return-object
                />
              </div>
              <v-text-field
                v-model="profile.password"
                label="Password"
                variant="outlined"
                type="password"
                color="blue"
              />

              <v-btn class="mt-4 ml-auto" color="primary" @click="saveProfile">Save changes</v-btn>
            </div>
          </v-window-item>

          <!-- Team Section -->
          <!-- Team Section -->
          <v-window-item value="team">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold mb-4">Users</h2>
                <!-- <v-btn @click="openModal" class="mt-4" color="primary">Invite User</v-btn> -->
              </div>

              <div
                v-if="users.length === 0"
                class="flex flex-col items-center justify-center text-center"
              >
                <v-icon size="64" color="blue">mdi-account-multiple-outline</v-icon>
                <p class="text-gray-600 mt-4 text-lg">No users found</p>
                <p class="text-gray-500 mb-4">Start by inviting your first team member.</p>
                <v-btn color="blue" @click="openModal">Invite User</v-btn>
              </div>

              <v-table v-else>
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
        <v-card class="bg-white rounded-lg shadow-lg max-h-[90vh] flex flex-col relative">
          <div class="flex justify-between items-center mb-4 p-4">
            <h2 class="text-lg font-bold text-blue-600 mb-4">New User</h2>
            <div @click="closeModal">
              <i class="fa-solid fa-close text-3xl text-red mr-2"></i>
            </div>
          </div>

          <!-- Scrollable Form Body -->
          <div class="px-6 overflow-y-auto flex-1">
            <form @submit.prevent="inviteUser">
              <v-text-field
                v-model="newUser.firstname"
                label="First Name"
                variant="outlined"
                color="blue"
                class="mt-4"
              />
              <v-text-field
                v-model="newUser.lastname"
                label="Last Name"
                variant="outlined"
                color="blue"
              />
              <v-text-field
                v-model="newUser.email"
                label="Email address"
                variant="outlined"
                color="blue"
              />
              <v-text-field
                v-model="newUser.phone_number"
                label="Phone number"
                variant="outlined"
                color="blue"
              />
              <v-text-field
                v-model="newUser.password"
                type="password"
                label="Password"
                variant="outlined"
                color="blue"
              />

              <div class="relative">
                <!-- Dropdown menu -->
                <div
                  v-if="isDropdownOpen"
                  class="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                >
                  <ul class="py-2">
                    <li
                      v-for="role in roles"
                      :key="role.value"
                      class="px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
                      @click="selectRole(role)"
                    >
                      {{ role.label }}
                    </li>
                  </ul>
                </div>
                <!-- Button to toggle dropdown -->
                <v-text-field
                  color="blue"
                  variant="outlined"
                  v-model="selectedRoleLabel"
                  label="Role"
                  readonly
                  class="w-full cursor-pointer"
                  @click="toggleDropdown"
                />
              </div>
            </form>
          </div>

          <!-- Footer -->
          <div class="px-6 pb-6">
            <v-btn
              color="blue"
              class="w-full bg-blue-600 text-white mt-4 custom-btn"
              @click="inviteUser"
            >
              Invite User
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/full/MainLayout.vue'
const activeTab = ref('profile')
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
const token = savedAuth?.token || authStore.token
const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
const user = savedAuth?.user

const profile = ref({
  user_id: '',
  firstname: '',
  lastname: '',
  phone_number: '',
  email: '',
  role: '',
  password: ''
})
const users = ref([])
const email = ref('')
const selectedRole = ref(null)

const roles = ref([
  { value: 'tenant', label: 'Tenant' },
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'credit_manager', label: 'Credit Manager' },
  { value: 'loan_manager', label: 'Loan Manager' },
  { value: 'analysis_manager', label: 'Analysis Manager' },
  { value: 'observer', label: 'Observer' }
])
const isLoading = ref(true)

const getRoles = async () => {
  try {
    const response = await axios.get(
      `https://dev02201.getjupita.com/api/${tenantId.value}/get-roles`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    console.log('roles response:', response)
    if (response.data && response.data.data && Array.isArray(response.data.data.roles)) {
      roles.value = response.data.data.roles.map((role) => ({
        value: role.title, // You can use `role.id` as the value
        label: role.title // Use `role.title` for the label
      }))
      console.log('Mapped roles:', roles.value)
    } else {
      roles.value = []
    }
  } catch (error) {
    console.error('Error fetching roles:', error)
    roles.value = []
  }
}



const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const newUser = ref({
  user_id: '',
  firstname: '',
  lastname: '',
  phone_number: '',
  email: '',
  password: '',
  role: 'tenant'
})

const inviteUser = async () => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
  try {
    const payload = {
      firstname: newUser.value.firstname,
      lastname: newUser.value.lastname,
      email: newUser.value.email,
      phone_number: newUser.value.phone_number,
      password: newUser.value.password,
      roles: newUser.value.role
    }
    console.log('invite user request payload:', payload)
    const response = await axios.post(
      `https://dev02201.getjupita.com/api/${tenantId}/add-member`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(response)

    Swal.fire({
      icon: 'success',
      title: 'User Invited',
      text: 'The user was successfully invited.',
      confirmButtonColor: '#2563eb'
    })

    closeModal()
  } catch (err) {
    console.error('Invite failed:', err)
    closeModal()

    Swal.fire({
      icon: 'error',
      title: 'Invitation Failed',
      text: 'There was a problem inviting the user.',
      confirmButtonColor: '#dc2626'
    })
  }
}

const updatePassword = async () => {
  if (!profile.value.password) return

  try {
    const response = await axios.put(
      `https://dev02201.getjupita.com/api/${tenantId}/update-password`,
      { password: profile.value.password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('Password update success:', response.data)
    Swal.fire('Success', 'Password updated successfully.', 'success')
  } catch (error) {
    console.error('Error updating password:', error)
    Swal.fire('Error', 'Failed to update password.', 'error')
  }
}

const api = ref({
  clientId: 'jupita-sofimfb-api',
  secretKey: '**********'
})

const saveProfile = async () => {
  try {
    const payload = {
      user_id: profile.value.user_id,
      firstname: profile.value.firstname,
      lastname: profile.value.lastname,
      email: profile.value.email,
      phone_number: profile.value.phone_number
    }
    console.log('payload save profile:', payload)
    const response = await axios.put(
      `https://dev02201.getjupita.com/api/${tenantId}/update-user-data`,
      payload,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    await updatePassword()
    Swal.fire('Success', 'Profile uploaded successfully!', 'success')
    console.log('Response:', response.data)
  } catch (err) {
    console.error('Update failed:', err)
    alert('Something went wrong while updating your profile.')
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  alert('Copied to clipboard!')
}

onMounted(() => {
  console.log('User data from storage:', user)
  if (user) {
    profile.value = {
      user_id: user.id || '',
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      phone_number: user.phone_number || '',
      email: user.email || '',
      role: ''
    }
    email.value = user.email || ''
  }
})
</script>

<style scoped>
.custom-btn {
  text-transform: none !important;
}
.v-card {
  border-radius: 12px;
}
.v-tab {
  text-transform: none !important;
}
</style>
