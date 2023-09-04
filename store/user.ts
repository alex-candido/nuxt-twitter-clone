import { defineStore } from 'pinia'
import { CurrentUser } from '../types/user'

interface EditPayloadInterface {
  userId: string
  name: string
  username: string
  bio: string
  profileImage: any[]
  coverImage: any[]
}

export const useUserStore = defineStore('user-store', {
  state: () => ({
    isLoading: ref(false as boolean),
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
    async setUser({ userId }: { userId: string | null | undefined }) {
      const { data: fetchedUser, pending } = await useUser({ userId })
      this.isUser = fetchedUser
      this.isLoading = pending.value
    },
    async setUserEdit({
      userId,
      name,
      username,
      bio,
      profileImage,
      coverImage,
    }: EditPayloadInterface) {
      const { data: currentUser } = await useEdit({
        userId: userId as string,
        name,
        username,
        bio,
        profileImage,
        coverImage,
      })
      this.isUser = currentUser
    },
  },
})
