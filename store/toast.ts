import { useStorage } from '@vueuse/core'
import { defineStore, skipHydrate } from 'pinia'

export interface StateProps {
  isToast: boolean
  successMsg: string
}

export const useToastStore = defineStore('auth', () => {
  const isToast = useStorage(
    'vue-toast-local-storage',
    ref({ isToast: false, successMsg: '' } as StateProps),
  )

  const onOpen = (successMsg: string) => {
    isToast.value.isToast = true
    isToast.value.successMsg = successMsg
  }

  const onClose = () => {
    isToast.value.isToast = false
  }

  return {
    isToast: skipHydrate(isToast),
    onOpen,
    onClose,
  }
})
