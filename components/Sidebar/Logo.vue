<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const router = useRouter()

const redirectToHome = () => {
  router.push('/')
}
</script>
<template>
  <div
    class="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-opacity-10 cursor-pointer transition"
    @click="redirectToHome"
  >
    <Icon name="ri:twitter-x-fill" size="2.5rem" color="white" />
  </div>
</template>
