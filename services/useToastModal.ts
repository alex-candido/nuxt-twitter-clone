import { useStorage } from '@vueuse/core'

const isLoggedin = ref({
  isToast: false, // 登录状态
  successMsg: '',
})

useStorage('vue-use-local-storage', isLoggedin.value)

const onOpen = (successMsg: string) => {
  isLoggedin.value.isToast = true
  isLoggedin.value.successMsg = successMsg
}

const onClose = () => {
  isLoggedin.value.isToast = false
}

const useToastModal = {
  isLoggedin,
  onOpen,
  onClose,
}

export default useToastModal
