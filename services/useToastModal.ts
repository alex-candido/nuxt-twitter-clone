/* eslint-disable prettier/prettier */
/* eslint-disable import/first */
// store.js
import { createGlobalState, useStorage } from '@vueuse/core'
interface ModalState {
  isOpen: boolean
}

const state: ModalState = reactive({
  isOpen: false,
})

export const useGlobalState = createGlobalState(() =>
  useStorage('vueuse-local-storage', state.isOpen)
)


const onOpen = () => {
  state.isOpen = true
}

const onClose = () => {
  state.isOpen = false
}

const useToastModal = {
  state: readonly(state),
  onOpen,
  onClose,
}

export default useToastModal
