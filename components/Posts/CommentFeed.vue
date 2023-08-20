<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
defineProps({
  comments: {
    type: Array as () => Record<string, any>[],
    default: () => [],
  },
})
</script>
<template>
  <div>
    <PostsCommentItem
      v-for="comment in comments"
      :key="comment.id"
      :data="comment"
    />
  </div>
</template>
