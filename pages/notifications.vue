<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useLoginModal from '../services/useLoginModal';
import { useNotificationsStore } from '../store/notifications';
import { useUserStore } from '../store/user';
const { setNotifications } = useNotificationsStore()
const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())

const router = useRouter()

onBeforeMount(async () => {
  if (!isCurrentUser?.value?.id) {
    useLoginModal.onOpen()
    router.push('/')
  }

  if (isCurrentUser?.value?.id) {
    await setNotifications(isCurrentUser?.value?.id)
  }
})
</script>
<template>
  <div>
    <UIHeader show-back-arrow label="Notifications" />
    <UINotificationsFeed />
  </div>
</template>
