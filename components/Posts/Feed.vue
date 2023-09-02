<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../../store/posts';
import { CurrentPost } from '../../types/post';
const { getCurrentPosts } = storeToRefs(usePostsStore())

const props = defineProps({
  userId: {
    type: String,
    default: '',
  },
})

const currentPosts = ref([] as CurrentPost[] | null)

onMounted(() => {
  watchEffect(() => {
    if (getCurrentPosts.value && getCurrentPosts.value.length >= 1) {
      currentPosts.value = getCurrentPosts.value
    }
  })
})

watch(
  () => currentPosts.value,
  () => {
    if (getCurrentPosts.value && getCurrentPosts.value.length >= 1) {
      currentPosts.value = getCurrentPosts.value
    }
  },
)
</script>
<template>
  <div
    v-for="(post, index) in currentPosts"
    :key="index"
    class="dark:bg-dim-900"
  >
    <PostsItem :user-id="props.userId" :data="post" />
  </div>
</template>
