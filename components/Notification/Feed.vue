<!-- eslint-disable import/order -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNotificationsStore } from '../../store/notifications';
import { useUserStore } from '../../store/user';

const { setNotifications } = useNotificationsStore()
const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())
const { getNotifications: fetchedNotifications } = storeToRefs(
  useNotificationsStore(),
)

watchEffect(async () => {
  if (isCurrentUser.value?.id) {
    await setNotifications(isCurrentUser.value?.id)
  }
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
      <div v-for="notification in fetchedNotifications" :key="notification.id">
        <NotificationItem :data="notification" />
      </div>
    </div>
  </div>
</template>
