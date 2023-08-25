<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable import/order -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import useLoginModal from '@/services/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  userId: {
    type: String,
    default: '',
  },
})

const router = useRouter()
const { data: currentUser } = await useCurrentUser()
 await useLike({postId: props.data.id, userId: props.userId });
const hasLiked = true

const goToUser = (event: any) => {
  event.stopPropagation()
  router.push(`/users/${props.data.id}`)
}

const goToPost = (event: any) => {
  event.stopPropagation()
  router.push(`/posts/${props.data.id}`)
}

const onLike = async (event: any) => {
  event.stopPropagation()

  if (!currentUser) {
    return useLoginModal.onOpen()
  }

  // toggleLike()
}

const LikeIcon = computed(() => {
  return hasLiked ? 'bi:heart-fill' : 'bi:heart'
})

const createdAt = computed(() => {
  if (!props.data?.createdAt) {
    return null
  }

  return formatDistanceToNowStrict(new Date(props.data.createdAt));
})
</script>
<template>
  <div
    class="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition"
    @click="goToPost"
  >
    <div class="flex flex-row items-start gap-3">
      <UIAvatar :user-id="data.user.id" />
      <div>
        <div class="flex flex-row items-center gap-2">
          <p
            class="text-white font-semibold cursor-pointer hover:underline"
            @click="goToUser"
          >
            {{ data.user.name }}
          </p>
          <span
            class="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            @click="goToUser"
          >
            @{{ data.user.username }}
          </span>
          <span class="text-neutral-500 text-sm">{{ createdAt }}</span>
        </div>
        <!-- <div class="flex my-5 mr-2 border-1 rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            class="w-full rounded-2xl"
          />
        </div> -->
        <div class="text-white mt-1">{{ data.body }}</div>
        <div class="flex flex-row items-center mt-3 gap-10">
          <div
            class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500"
          >
            <Icon name="ant-design:message-outlined" size="1.5rem" />
            <p>{{ data.comments?.length || 0 }}</p>
          </div>
          <div
            class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            @click="onLike"
          >
            <Icon
              :name="LikeIcon"
              size="1.3rem"
              :color="{ red: hasLiked, '': !hasLiked }"
            />
            <p>{{ data.likedIds?.length || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
