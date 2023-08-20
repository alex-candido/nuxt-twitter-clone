interface ModalState {
  isOpen: boolean
}

const state: ModalState = reactive({
  isOpen: true,
})

const onOpen = () => {
  state.isOpen = true
}

const onClose = () => {
  state.isOpen = false
}

const useLoginModal = {
  state: readonly(state),
  onOpen,
  onClose,
}

export default useLoginModal
