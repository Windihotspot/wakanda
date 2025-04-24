import { defineStore } from 'pinia'
import axios from 'axios'

interface AuthState {
  tenant_id: string | null
  token: string | null
  verification_status: string | null
  user: any | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    tenant_id: null,
    token: null,
    verification_status: null,
    user: null
  }),

  actions: {
    
    setAuthData(data: any) {
      console.log(localStorage.getItem('token'))
      console.log('Setting Auth Data:', data)
      

      this.tenant_id = data.user?.tenant_id || null
      this.token = data.token || null
      this.verification_status = data.user?.verification_status || null

      // Store the full user data
      this.user = data.user || {}

      if (data.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        axios.defaults.headers.common['Accept'] = 'application/json'
      }
    },

    init() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        axios.defaults.headers.common['Accept'] = 'application/json'
      }
    },
  },

  persist: true // Ensure data persists across reloads (optional)
})



