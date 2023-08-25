<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import useLoginModal from '@/services/useLoginModal';
import useRegisterModal from '@/services/useRegisterModal';
import { useToastStore } from '@/store/toast';
const { onOpen } = useToastStore()
const { signIn,  } = useAuth()

const currentRegister = reactive({
  email: '',
  password: '',
  name: '',
  username: '',
  errorMsg: '',
  successMsg: '',
  isLoading: false,
})

const onToggle = () => {
  if (currentRegister.isLoading) {
    return
  }

  useRegisterModal.onClose()
  useLoginModal.onOpen()
}

const onSubmit = async () => {
  try {
    currentRegister.isLoading = true

    await useRegister({
      email: currentRegister.email,
      password: currentRegister.password,
      username: currentRegister.username,
      name: currentRegister.name,
    })

    currentRegister.isLoading = false

    signIn('credentials', {
      email: currentRegister.email,
      password: currentRegister.password,
    })

    useRegisterModal.onClose()
  } catch (error) {
    if (error instanceof Error) {
      currentRegister.errorMsg = error.message
    }
  } finally {
    currentRegister.isLoading = false
  }
}

const handleSubmit = () => {
  onOpen('You are registered!')
  onSubmit()
}
</script>
<template>
  <Modal
    :disabled="currentRegister.isLoading"
    :is-open="useRegisterModal.state.isOpen"
    title="Create an account"
    action-label="Register"
    @close="useRegisterModal.onClose()"
    @submit="handleSubmit"
  >
    <template #default>
      <div class="flex flex-col gap-4">
        <UIInput
          v-model="currentRegister.email"
          placeholder="Email"
          type="email"
          :disabled="currentRegister.isLoading"
        />
        <UIInput
          v-model="currentRegister.name"
          placeholder="Name"
          type="text"
          :disabled="currentRegister.isLoading"
        />
        <UIInput
          v-model="currentRegister.username"
          placeholder="Username"
          type="text"
          :disabled="currentRegister.isLoading"
        />
        <UIInput
          v-model="currentRegister.password"
          placeholder="Password"
          type="password"
          :disabled="currentRegister.isLoading"
        />
      </div>
    </template>
    <template #footer>
      <div class="text-neutral-400 text-center mt-4">
        <p>Already have an account?</p>
        <span
          class="text-white cursor-pointer hover:underline"
          @click="onToggle"
        >
          Sign in
        </span>
      </div>
    </template>
  </Modal>
</template>
