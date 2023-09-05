<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../store/user';
import { CurrentUser } from '../../types/user';

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})
const { setUser } = useUserStore()
const { getUser: fetchedUser } = storeToRefs(useUserStore())

const currentUser = ref({} as CurrentUser | null)

watchEffect(async () => {
  if (props.userId) {
    await setUser({ userId: props.userId as string })
    currentUser.value = fetchedUser.value
  }
})

onBeforeMount(async() => {
  if (props.userId) {
    await setUser({ userId: props.userId as string })
    currentUser.value = fetchedUser.value
  }
})

</script>
<template>
  <div>
    <div class="bg-neutral-700 h-44 relative">
      <div class="overflow-hidden h-44">
        <nuxt-img
          v-if="currentUser?.coverImage"
          :src="currentUser?.coverImage"
          fill
          alt="Cover Image"
          style="object-fit: cover"
        />
      </div>
      <div class="absolute -bottom-16 left-4">
        <UIAvatar
          :profile-image="fetchedUser?.profileImage"
          :user-id="userId"
          is-large
          has-border
        />
      </div>
    </div>
  </div>
</template>
