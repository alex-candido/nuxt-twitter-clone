<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user';

const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())
const { setCurrentuser } = useUserStore()
await setCurrentuser()
</script>
<template>
  <div class="min-h-full dark:bg-dim-900">
    <div class="container h-full mx-auto xl:px-30 max-w-6xl">
      <div class="grid grid-cols-4 h-full">
        <SidebarLeft :user="isCurrentUser" />
        <div class="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-600">
          <slot />
        </div>
        <SidebarRight />
      </div>
    </div>
  </div>
</template>
