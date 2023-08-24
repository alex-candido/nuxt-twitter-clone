<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import usePosts from '../../composables/usePosts';
const props = defineProps({
  userId: {
    type: String,
    default: '',
  },
})

const { data: posts } = await usePosts()
</script>
<template>
  <div v-for="(post, index) in posts" :key="index" class="dark:bg-dim-900">
    <PostsItem :user-id="props.userId" :data="post" />
  </div>
</template>
