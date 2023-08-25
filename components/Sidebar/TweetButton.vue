<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import loginModal from '@/services/useLoginModal';

const onClick = () => {
  loginModal.onOpen()
}
</script>

<template>
  <div @click="onClick">
    <div
      class="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer"
    >
      <Icon name="fa6-solid:feather" size="1.5rem" color="white" />
    </div>
    <div
      class="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition"
    >
      <p
        class="hidden lg:block text-center font-semibold text-white text-[20px]"
      >
        Tweet
      </p>
    </div>
  </div>
</template>
