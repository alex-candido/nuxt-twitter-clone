<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import useSetFollow from '../../composables/useSetFollow'
import useEditModal from '../../services/useEditModal'
import useLoginModal from '../../services/useLoginModal'
import { useUserStore } from '../../store/user'
import { CurrentUser } from '../../types/user'

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})

const { setUser, setCurrentuser } = useUserStore()
const { getUser: fetchedUser, getCurrenUser: isCurrentUser } = storeToRefs(
  useUserStore(),
)

const currentUser = ref({} as CurrentUser | null)

watchEffect(async () => {
  if (props.userId) {
    await setUser({ userId: props.userId as string })
    currentUser.value = fetchedUser.value
  }
})

onBeforeMount(async () => {
  if (props.userId) {
    await setUser({ userId: props.userId as string })
    currentUser.value = fetchedUser.value
  }
})

const follow = async () => {
  await useSetFollow({
    userId: props.userId,
    method: 'POST',
    currentUser: isCurrentUser.value,
  })
  await setCurrentuser()
  await setUser({ userId: props.userId as string })
}

const unFollow = async () => {
  await useSetFollow({
    userId: props.userId,
    method: 'DELETE',
    currentUser: isCurrentUser.value,
  })
  await setCurrentuser()
  await setUser({ userId: props.userId as string })
}

const isFollowing = computed(() => {
  const list = isCurrentUser.value?.followingIds || []
  if (props.userId){
    return list.includes(props.userId)
  }
})

const toggleFollow = async () => {
  if (isFollowing.value) {
    unFollow()
  } else {
    follow()
  }
}

const onFollow = async (event: Event) => {
  event.stopPropagation()

  if (!isCurrentUser.value?.id) {
    return useLoginModal.onOpen()
  }

  await toggleFollow()
}

const createdAt = computed(() => {
  const createdAt = fetchedUser.value?.createdAt as string | number | Date
  return format(new Date(createdAt), 'MMMM yyyy')
})
</script>
<template>
  <div class="border-b-[1px] border-neutral-800 pb-4">
    <div class="flex justify-end p-2">
      <UIButton
        v-if="isCurrentUser?.id === userId"
        :secondary="false"
        :label="'Edit'"
        @click="useEditModal.onOpen()"
      />
      <UIButton
        v-else
        class="button"
        :label="
          computed(() => {
            return isFollowing ? 'Unfollow' : 'Follow'
          }).value
        "
        :secondary="!isFollowing"
        :outline="isFollowing"
        @click="onFollow"
      />
    </div>
    <div class="mt-8 px-4">
      <div class="flex flex-col">
        <p class="text-white text-2xl font-semibold">{{ fetchedUser?.name }}</p>
        <p class="text-md text-neutral-500">@{{ fetchedUser?.username }}</p>
      </div>
      <div class="flex flex-col mt-4">
        <p class="text-white">{{ fetchedUser?.bio }}</p>
        <div class="flex flex-row items-center gap-2 mt-4 text-neutral-500">
          <Icon name="ic:baseline-calendar-month" size="1.7rem" />
          <p>Joined {{ createdAt }}</p>
        </div>
      </div>
      <div class="flex flex-row items-center mt-4 gap-6">
        <div class="flex flex-row items-center gap-1">
          <p class="text-white">{{ fetchedUser?.followingIds?.length || 0 }}</p>
          <p class="text-neutral-500">Following</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <p class="text-white">{{ fetchedUser?.followersIds?.length || 0 }}</p>
          <p class="text-neutral-500">Followers</p>
        </div>
      </div>
    </div>
  </div>
</template>
