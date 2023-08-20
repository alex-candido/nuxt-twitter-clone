<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
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
    alert: '',
    size: '1.3rem',
  },
  {
    icon: 'fa6-solid:user',
    label: 'Profile',
    href: `/users/${'any'}`,
    auth: true,
    size: '2rem',
  },
]

const emits = defineEmits<{
  (e: 'onLogout', value: Event): void
}>()

function onLogout(event: Event) {
  emits('onLogout', event)
}
</script>
<template>
  <div className="col-span-1 h-full pr-4 md:pr-6">
    <div className="flex flex-col items-end">
      <div className="space-y-2 lg:w-[230px]">
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
          v-if="true"
          icon="bx:log-out"
          label="Logout"
          @click="onLogout"
        />
        <SidebarTweetButton icon="tabler:logout-2" label="Logout" />
      </div>
    </div>
  </div>
</template>
