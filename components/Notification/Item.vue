<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/user'
import { useNotificationsStore } from '../../store/notifications'
import useNotificationTrash from '../../composables/useNotificationTrash'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const { setNotifications } = useNotificationsStore()
const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())

const onTrash = async (event: Event) => {
  event.stopPropagation()

  if (!isCurrentUser.value?.id) {
    return useLoginModal.onOpen()
  }

  if (isCurrentUser.value?.id === props.data.userId) {
    await useNotificationTrash({ notificationId: props.data.id })
    console.log('Deleted notification ' + props.data.id)
  } else {
    return useLoginModal.onOpen()
  }
  await setNotifications(isCurrentUser.value?.id)
}
</script>
<template>
  <div
    class="flex flex-row items-center justify-between p-6 gap-4 border-b-[1px] border-neutral-800"
  >
    <div class="flex gap-4">
      <Icon name="ri:twitter-x-fill" size="1.5rem" color="white" />
      <p class="text-white">{{ data.body }}</p>
    </div>
    <div
      class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500"
      @click="onTrash"
    >
      <Icon name="ph:trash" size="1.5rem" />
    </div>
  </div>
</template>
