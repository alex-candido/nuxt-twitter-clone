<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../../store/posts';
import { CurrentPost } from '../../types/post';
const { setCurrentUserPosts } =
  usePostsStore()
const { getCurrentUserPosts } = storeToRefs(usePostsStore())

const props = defineProps({
  userId: {
    type: String,
    default: '',
  },
})

const currentPosts = ref([] as CurrentPost[] | null)

watchEffect(async () => {

  if (getCurrentUserPosts.value && getCurrentUserPosts.value.length >= 1) {
      await setCurrentUserPosts({ userId: props.userId })
      currentPosts.value = getCurrentUserPosts.value
    }

  if (getCurrentUserPosts.value && getCurrentUserPosts.value.length >= 1) {
    currentPosts.value = getCurrentUserPosts.value
  }
})

onBeforeMount(() => {
  watchEffect(async () => {
    if (props.userId) {
      await setCurrentUserPosts({ userId: props.userId })
      currentPosts.value = getCurrentUserPosts.value
    }
  })
})
</script>
<template>
  <div
    v-show="currentPosts?.length === 0"
    class="text-neutral-600 text-center p-6 text-sm"
  >
    No Posts
  </div>
  <div v-if="currentPosts?.length" v-show="currentPosts?.length > 1">
    <div
      v-for="(post, index) in currentPosts"
      :key="index"
      class="dark:bg-dim-900"
    >
      <PostsItem :user-id="props.userId" :data="post" />
    </div>
  </div>
</template>
