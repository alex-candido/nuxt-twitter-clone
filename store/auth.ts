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
    async currentUser() {
      const { data } = await useFetch('/api/current', {
        method: 'GET',
      })

      if (!data) {
        console.log(data)
      }

      return data.value
    },
  },
})
