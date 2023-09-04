<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import useEdit from '../../composables/useEdit';
import useEditModal from '../../services/useEditModal';

const currentEdit = reactive({
  profileImage: [] as any[],
  coverImage: [] as any[],
  name: '',
  username: '',
  bio: '',
  errorMsg: '',
  successMsg: '',
  isLoading: false,
})

const onSubmit = async () => {
  try {
    currentEdit.isLoading = true

    await useEdit({
      name: currentEdit.name,
      username: currentEdit.username,
      bio: currentEdit.bio,
      profileImage: currentEdit.profileImage,
      coverImage: currentEdit.coverImage,
    })

    useEditModal.onClose()
  } catch (error) {
    if (error instanceof Error) {
      currentEdit.errorMsg = error.message
    }
  } finally {
    currentEdit.isLoading = false
  }
}
</script>
<template>
  <Modal
    :disabled="currentEdit.isLoading"
    :is-open="useEditModal.state.isOpen"
    title="Edit your profile"
    action-label="Save"
    @close="useEditModal.onClose()"
    @submit="onSubmit"
  >
    <template #default>
      <div class="flex flex-col gap-4">
        <UIImageUpload
          v-model="currentEdit.profileImage"
          :disabled="currentEdit.isLoading"
          label="Upload profile image"
        />
        <UIImageUpload
          v-model="currentEdit.coverImage"
          :disabled="currentEdit.isLoading"
          label="Upload cover image"
        />
        <UIInput
          v-model="currentEdit.name"
          placeholder="Name"
          :disabled="currentEdit.isLoading"
        />
        <UIInput
          v-model="currentEdit.username"
          placeholder="Username"
          :disabled="currentEdit.isLoading"
        />
        <UIInput
          v-model="currentEdit.bio"
          placeholder="Bio"
          :disabled="currentEdit.isLoading"
        />
      </div>
    </template>
  </Modal>
</template>
