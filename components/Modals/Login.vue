<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-export-in-script-setup -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import useLoginModal from '../../services/useLoginModal'
import useRegisterModal from '../../services/useRegisterModal'
import useToastModal from '../../services/useToastModal'

const { signIn } = useAuth()

const currentLogin = reactive({
  email: '',
  password: '',
  errorMsg: '',
  successMsg: '',
  isLoading: false,
  toast: false,
})

const onToggle = () => {
  if (currentLogin.isLoading) {
    return
  }

  useLoginModal.onClose()
  useRegisterModal.onOpen()
}

const onSubmit = async () => {
  try {
    currentLogin.isLoading = true

    useToastModal.onOpen()

    await signIn('credentials', {
      email: currentLogin.email,
      password: currentLogin.password,
    })

    currentLogin.isLoading = false

    currentLogin.toast = true

    useLoginModal.onClose()
  } catch (error) {
    if (error instanceof Error) {
      currentLogin.errorMsg = error.message
    }
  } finally {
    currentLogin.isLoading = false
  }
}
</script>
<template>
  <Modal
    :disabled="currentLogin.isLoading"
    :is-open="useLoginModal.state.isOpen"
    title="Login"
    action-label="Sign in"
    @close="useLoginModal.onClose()"
    @submit="onSubmit"
  >
    <template #default>
      <div class="flex flex-col gap-4">
        <UIInput
          v-model="currentLogin.email"
          placeholder="Email"
          type="email"
          :disabled="false"
        />
        <UIInput
          v-model="currentLogin.password"
          placeholder="Password"
          type="password"
          :disabled="false"
        />
        <p v-if="currentLogin.errorMsg" class="text-red-500">
          {{ currentLogin.errorMsg }}
        </p>
      </div>
    </template>
    <template #footer>
      <div class="text-neutral-400 text-center mt-4">
        <p>First time using Twitter?</p>
        <span
          class="text-white cursor-pointer hover:underline"
          @click="onToggle"
        >
          Create an account
        </span>
      </div>
    </template>
  </Modal>
</template>
