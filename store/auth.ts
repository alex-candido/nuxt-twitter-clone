import { defineStore } from 'pinia'

export const useMainStore = defineStore('store', () => {
  const someState = useLocalStorage('stored-state', 'initialValue')

  return { someState }
})
