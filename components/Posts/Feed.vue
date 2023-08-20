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
    id: 'sdgaahbth68534r1sabr1',
    body: 'Lorem ipsum',
  },
]
</script>
<template>
  <div>
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :user-id="props.userId"
      :data="post"
    />
  </div>
</template>
