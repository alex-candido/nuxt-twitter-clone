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
      const { data } = await useFetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
          username,
          name,
        },
      })

      const dataRequest = {
        method: data.value?.method,
        userData: data.value?.userData,
      }

      if (dataRequest) {
        console.log(dataRequest)
      }
    },
  },
})
