<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { CurrentUser } from '../../types/user'
const { signOut } = useAuth()

const props = defineProps({
  user: {
    type: Object as PropType<CurrentUser | null>,
    required: true,
  },
})

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
    alert: props.user?.hasNotification,
    size: '1.3rem',
  },
  {
    icon: 'fa6-solid:user',
    label: 'Profile',
    href: `/users/${props.user?.id}`,
    auth: true,
    size: '1.3rem',
  },
]

console.log(props.user)
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
          v-if="props.user?.id"
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
