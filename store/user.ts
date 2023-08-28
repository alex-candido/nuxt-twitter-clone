import { defineStore } from 'pinia'
import { CurrentUser } from '../types/user'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    isUser: ref({} as CurrentUser | null),
  }),
  getters: {
    getCurrenUser(state) {
      return state.isUser
    },
  },
  actions: {
    async setCurrentuser() {
      const { data: currentUser } = await useCurrentUser()
      this.isUser = currentUser
    },
  },
})
