<!-- eslint-disable import/order -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useNotificationsStore } from '../../store/notifications'
import { useUserStore } from '../../store/user'

const { setNotifications } = useNotificationsStore()
const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())
const { getNotifications: fetchedNotifications } = storeToRefs(
  useNotificationsStore(),
)

onMounted(() => {
  watchEffect(async () => {
    if (isCurrentUser.value?.id) {
      await setNotifications(isCurrentUser.value?.id)
    }
  })
})
</script>

<template>
  <div>
    <div
      v-if="fetchedNotifications?.length === 0"
      class="text-neutral-600 text-center p-6 text-xl"
    >
      No notifications
    </div>
    <div v-else class="flex flex-col">
      <div
        v-for="notification in fetchedNotifications"
        :key="notification.id"
        class="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
      >
        <Icon name="ri:twitter-x-fill" size="1.5rem" color="white" />
        <p class="text-white">{{ notification.body }}</p>
      </div>
    </div>
  </div>
</template>
