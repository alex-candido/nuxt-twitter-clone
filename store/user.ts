import { defineStore } from 'pinia'
import { CurrentUser } from '../types/user'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    isUser: ref({} as CurrentUser | null),
    isCurrentUser: ref({} as CurrentUser | null),
  }),
  getters: {
    getCurrenUser(state) {
      return state.isCurrentUser
    },
    getUser(state) {
      return state.isUser
    },
  },
  actions: {
    async setCurrentuser() {
      const { data: currentUser } = await useCurrentUser()
      this.isCurrentUser = currentUser
    },
    async setUser(userId: string) {
      const { data: fetchedUser } = await useUser(userId)
      this.isUser = fetchedUser
    },
  },
})
