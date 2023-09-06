<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import useLoginModal from '../services/useLoginModal';
import { useUserStore } from '../store/user';

const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())

const router = useRouter()

onBeforeMount(() => {
  if (!isCurrentUser?.value?.id) {
    useLoginModal.onOpen()
    router.push('/')
  }
})
</script>
<template>
  <div>
    <UIHeader show-back-arrow label="Notifications" />
    <NotificationFeed />
  </div>
</template>
