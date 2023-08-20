interface ModalState {
  isOpen: boolean
}

const state: ModalState = reactive({
  isOpen: false,
})

const onOpen = () => {
  state.isOpen = true
}

const onClose = () => {
  state.isOpen = false
}

const useEditModal = {
  state: readonly(state),
  onOpen,
  onClose,
}

export default useEditModal
