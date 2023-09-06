<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useEditModal from '../../services/useEditModal';
import { useUserStore } from '../../store/user';

const { setUser, setUserEdit } = useUserStore()
const { getCurrenUser: isCurrentUser, getUser: fetchedUser } = storeToRefs(
  useUserStore(),
)

const profileImage = ref([] as any[])
const coverImage = ref([] as any[])
const name = ref('')
const username = ref('')
const bio = ref('')
const errorMsg = ref('')
const isLoading = ref(false as boolean)

const onSubmit = async () => {
  try {
    isLoading.value = true

    await setUserEdit({
      userId: isCurrentUser.value?.id as string,
      name: name.value,
      username: username.value,
      bio: bio.value,
      profileImage: profileImage.value || [],
      coverImage: coverImage.value || [],
    })

    await setUser({ userId: isCurrentUser.value?.id })
    useEditModal.onClose()
    location.reload()
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = error.message
    }
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (fetchedUser.value) {
    name.value = fetchedUser.value.name as string
    username.value = fetchedUser.value.username as string
    bio.value = fetchedUser.value.bio as string
  }
})

</script>
<template>
  <Modal
    :disabled="isLoading"
    :is-open="useEditModal.state.isOpen"
    title="Edit your profile"
    action-label="Save"
    @close="useEditModal.onClose()"
    @submit="onSubmit"
  >
    <template #default>
      <div class="flex flex-col gap-4">
        <UIImageUpload
          v-model="profileImage"
          :value="computed(() => isCurrentUser?.profileImage).value as string"
          :disabled="isLoading"
          label="Upload profile image"
        />
        <UIImageUpload
          v-model="coverImage"
          :value="computed(() => isCurrentUser?.coverImage).value as string"
          :disabled="isLoading"
          label="Upload cover image"
        />
        <div class="w-full">
          <input
            v-model="name"
            placeholder="Name"
            :disabled="isLoading"
            class="w-full p-4 text-lg dark:bg-dim-900 border-2 border-neutral-600 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>
        <div class="w-full">
          <input
            v-model="username"
            placeholder="Username"
            :disabled="isLoading"
            class="w-full p-4 text-lg dark:bg-dim-900 border-2 border-neutral-600 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>
        <div class="w-full">
          <input
            v-model="bio"
            placeholder="Bio"
            :disabled="isLoading"
            class="w-full p-4 text-lg dark:bg-dim-900 border-2 border-neutral-600 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>
