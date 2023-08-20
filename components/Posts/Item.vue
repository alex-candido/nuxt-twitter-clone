<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
interface PostItemProps {
  data: {
    id: string
    user: {
      id: string
      name: string
      username: string
    }
    body: string
    createdAt?: string
    comments?: any[]
    likedIds?: any[]
  }
  userId?: string
}
const props = defineProps({
  data: {
    type: Object as () => PostItemProps['data'],
    default: () => ({}),
  },
  userId: {
    type: String,
    default: '',
  },
})

const router = useRouter()

const goToUser = (event: any) => {
  event.stopPropagation()
  router.push(`/users/${props.data.user.id}`)
}

const goToPost = (event: any) => {
  event.stopPropagation()
  router.push(`/posts/${props.data.id}`)
}

const onLike = async (event: any) => {
  event.stopPropagation()

  // if (!currentUser) {
  //   return loginModal.onOpen()
  // }

  // toggleLike()
}

const LikeIcon = computed(() => ({}))

const createdAt = computed(() => {
  if (!props.data?.createdAt) {
    return null
  }
})
</script>
<template>
  <div
    class="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition"
    @click="goToPost"
  >
    <div class="flex flex-row items-start gap-3">
      <Avatar :user-id="data.user.id" />
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
        <div class="text-white mt-1">{{ data.body }}</div>
        <div class="flex flex-row items-center mt-3 gap-10">
          <div
            class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500"
          >
            <AiOutlineMessage size="20" />
            <p>{{ data.comments?.length || 0 }}</p>
          </div>
          <div
            class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            @click="onLike"
          >
            <LikeIcon :color="'true' ? 'red' : ''" size="20" />
            <p>{{ data.likedIds?.length || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
