<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import { usePostsStore } from '../store/posts'
import { useUserStore } from '../store/user'

const { setCurrentuser } = useUserStore()
const { setCurrentPosts } = usePostsStore()

const darkMode = ref(true)

onMounted(async () => {
  await setCurrentuser()
  await setCurrentPosts()
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
