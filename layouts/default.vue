<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNotificationsStore } from '../store/notifications';
import { usePostsStore } from '../store/posts';
import { useUserStore } from '../store/user';

const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())
const { setNotifications } = useNotificationsStore()
const { setCurrentuser } = useUserStore()
const { setCurrentPosts } = usePostsStore()

const darkMode = ref(true)

onMounted(async () => {
  await setCurrentuser()
  await setCurrentPosts()
  if (isCurrentUser.value?.id) {
    await setNotifications(isCurrentUser.value?.id)
  }
})
</script>
<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <UIToast />
      <ModalsLogin />
      <ModalsRegister />
      <ModalsEdit />
      <MainSection>
        <router-view />
      </MainSection>
    </div>
  </div>
</template>
