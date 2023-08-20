<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
const props = defineProps({
  userId: {
    type: String,
    default: '',
  },
})

const posts = [
  {
    id: 'string',
    user: {
      id: 'string',
      name: 'string',
      username: 'string',
    },
    body: 'string',
    createdAt: 'string',
    comments: [],
    likedIds: [],
  },
  {
    id: 'string',
    user: {
      id: 'string',
      name: 'string',
      username: 'string',
    },
    body: 'string',
    createdAt: 'string',
    comments: [],
    likedIds: [],
  },
]
</script>
<template>
  <div class="dark:bg-dim-900">
    <PostsItem
      v-for="post in posts"
      :key="post.id"
      :user-id="props.userId"
      :data="post"
    />
  </div>
</template>
