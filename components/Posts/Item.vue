<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable import/order -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { formatDistanceToNowStrict } from 'date-fns'
import { storeToRefs } from 'pinia'
import useSetLike from '../../composables/useSetLike'
import useLoginModal from '../../services/useLoginModal'
import { usePostsStore } from '../../store/posts'
import { useUserStore } from '../../store/user'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    default: '',
  },
  details: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const { setCurrentPosts, setCurrentPost } = usePostsStore()
const { getCurrentPost: currentPost } = storeToRefs(usePostsStore())
const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())

console.log(currentPost.value)

const likePost = async () => {
  await useSetLike({
    postId: props.data.id,
    method: 'POST',
    currentUser: isCurrentUser.value,
  })
  await setCurrentPosts()
  await setCurrentPost(props.data.id)
}

const unlikePost = async () => {
  await useSetLike({
    postId: props.data.id,
    method: 'DELETE',
    currentUser: isCurrentUser.value,
  })
  await setCurrentPosts()
  await setCurrentPost(props.data.id)
}

const hasLiked = computed(() => {
  const list = props.details
    ? currentPost.value?.likedIds || []
    : props.data.likedIds

  if (isCurrentUser.value?.id) {
    return list.includes(isCurrentUser.value?.id)
  }
})

const toggleLike = async () => {
  if (props.data.likedIds.length < 1) {
    likePost()
  }
  if (hasLiked.value) {
    unlikePost()
  } else {
    likePost()
  }

  await setCurrentPosts()
  await setCurrentPost(props.data.id)
}

const goToUser = (event: any) => {
  event.stopPropagation()
  router.push(`/users/${props.data.id}`)
}

const goToPost = (event: any) => {
  event.stopPropagation()
  router.push(`/posts/${props.data.id}`)
}

const onLike = async (event: Event) => {
  event.stopPropagation()

  if (!isCurrentUser.value?.id) {
    return useLoginModal.onOpen()
  }

  await toggleLike()

  // if (props.details) {
  //   location.reload()
  // }
}

const createdAt = computed(() => {
  if (!props.data?.createdAt) {
    return null
  }

  return formatDistanceToNowStrict(new Date(props.data.createdAt))
})

onMounted(async () => {
  await setCurrentPost(props.data.id)
})
</script>
<template>
  <div
    class="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition"
    @click="goToPost"
  >
    <div class="flex flex-row items-start gap-3">
      <UIAvatar :user-id="props.data.user.id || ''" />
      <div>
        <div class="flex flex-row items-center gap-2">
          <p
            class="text-white font-semibold cursor-pointer hover:underline"
            @click="goToUser"
          >
            {{ props.data.user.name }}
          </p>
          <span
            class="text-neutral-500 cursor-pointer hover:underline md:block"
            @click="goToUser"
          >
            @{{ props.data.user.username }}
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
            <p>{{ props.data.comments?.length || 0 }}</p>
          </div>
          <div
            class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            @click="onLike"
          >
            <Icon
              :name="
                computed(() => {
                  return hasLiked && props.data.id
                    ? 'bi:heart-fill'
                    : 'bi:heart'
                }).value
              "
              size="1.3rem"
              :color="
                computed(() => {
                  return hasLiked && props.data.id ? 'red' : ''
                }).value
              "
            />
            <p>{{ data.likedIds?.length || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
