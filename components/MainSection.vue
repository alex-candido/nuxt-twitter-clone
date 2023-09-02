<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { useUserStore } from '../store/user';
const { setCurrentuser } = useUserStore()
await setCurrentuser()
</script>
<template>
  <div class="min-h-full dark:bg-dim-900">
    <div class="container h-full mx-auto xl:px-30 max-w-6xl">
      <div class="grid grid-cols-4 h-full">
        <SidebarLeft />
        <div class="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-600">
          <slot />
        </div>
        <SidebarRight />
      </div>
    </div>
  </div>
</template>
