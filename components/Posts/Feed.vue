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

const currentPost = ref([] as CurrentPost[] | null)

onMounted(() => {
  watchEffect(() => {
    if (getCurrentPosts.value && getCurrentPosts.value.length >= 1) {
      currentPost.value = getCurrentPosts.value
    }
  })
})

watch(
  () => currentPost.value,
  () => {
    if (getCurrentPosts.value && getCurrentPosts.value.length >= 1) {
      currentPost.value = getCurrentPosts.value
    }
  },
)
</script>
<template>
  <button
    class="bg-sky-500 px-5 py-3text-xl disabled:opacity-7 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2"
  >
    Atualizar
  </button>
  <div
    v-for="(post, index) in currentPost"
    :key="index"
    class="dark:bg-dim-900"
  >
    <PostsItem :user-id="props.userId" :data="post" />
  </div>
</template>
