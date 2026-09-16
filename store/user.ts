import { defineStore } from 'pinia'

export interface AuthUser {
  id: string
  username?: string
  fname?: string
  mname?: string | null
  lname?: string
  email?: string
  mailing_address?: string | null
  isDemo?: boolean
}

interface UserState {
  user: AuthUser | null
  currentUsersPage: number
  selectedUser: AuthUser | null
}

export const useUserStore = defineStore('userStore', {
  persist: true,

  state: (): UserState => ({
    user: null,
    currentUsersPage: 1,
    selectedUser: null,
  }),

  actions: {
    setUser(user: AuthUser) {
      this.user = user
    },

    setSelectedUser(data: AuthUser | null) {
      this.selectedUser = data
    },

    resetUser() {
      this.user = null
    },

    resetSelectedUser() {
      this.selectedUser = null
    },
  },

  getters: {
    getUser: (state): AuthUser | null => state.user,

    getSelectedUser: (state): AuthUser | null =>
      state.selectedUser,
  },
})