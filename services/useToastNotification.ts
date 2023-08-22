import { useStorage } from '@vueuse/core'

const isLoggedIn = ref({
  isToast: false,
  successMsg: '',
})

useStorage('vue-use-local-storage', isLoggedIn.value)

const onOpen = (successMsg: string) => {
  isLoggedIn.value.isToast = true
  isLoggedIn.value.successMsg = successMsg
}

const onClose = () => {
  isLoggedIn.value.isToast = false
  isLoggedIn.value.successMsg = ''
}

const useToastNotification = {
  isLoggedIn,
  onOpen,
  onClose,
}

export default useToastNotification
