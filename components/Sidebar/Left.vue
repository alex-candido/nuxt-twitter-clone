<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../store/user';
const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())
const { signOut } = useAuth()

const items = [
  {
    icon: 'bi:house-fill',
    label: 'Home',
    href: '/',
    size: '1.3rem',
  },
  {
    icon: 'bi:bell-fill',
    label: 'Notifications',
    href: '/notifications',
    auth: true,
    alert: isCurrentUser.value?.hasNotification,
    size: '1.3rem',
  },
  {
    icon: 'fa6-solid:user',
    label: 'Profile',
    href: `/users/${isCurrentUser.value?.id}`,
    auth: true,
    size: '1.3rem',
  },
]

</script>
<template>
  <div class="col-span-1 h-screen pr-4 md:pr-6 dark:bg-dim-900">
    <div class="flex flex-col items-end">
      <div class="space-y-2 lg:w-[230px]">
        <SidebarLogo />
        <SidebarItem
          v-for="item in items"
          :key="item.href"
          :href="item.href"
          :label="item.label"
          :icon="item.icon"
          :auth="item.auth"
          :alert="item.alert"
          :size="item.size"
        />
        <SidebarItem
          v-if="isCurrentUser"
          icon="bx:log-out"
          label="Logout"
          size="1.3rem"
          @click="signOut()"
        />
        <SidebarTweetButton icon="tabler:logout-2" label="Logout" />
      </div>
    </div>
  </div>
</template>
