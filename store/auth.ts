import { defineStore } from 'pinia'

interface RegisterPayloadInterface {
  email: string
  password: string
  username: string
  name: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  actions: {
    async register({
      email,
      password,
      username,
      name,
    }: RegisterPayloadInterface) {
      await useFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
          username,
          name,
        },
      })
    },
  },
})
