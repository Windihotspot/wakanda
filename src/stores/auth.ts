import { defineStore } from 'pinia'

interface AuthState {
  tenant_id: string | null
  token: string | null
  verification_status: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    tenant_id: null,
    token: null,
    verification_status: null
  }),

  actions: {
    setAuthData(data: AuthState) {
      this.tenant_id = data.tenant_id
      this.token = data.token
      this.verification_status = data.verification_status
    },

    clearAuthData() {
      this.tenant_id = null
      this.token = null
      this.verification_status = null
    }
  },

  persist: true // Ensure data persists across reloads (optional)
})
