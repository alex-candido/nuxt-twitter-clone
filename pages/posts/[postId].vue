<script lang="ts" setup>
const router = useRouter()
const { postId } = router.currentRoute.value.params
</script>
<template>
  <div>
    <UIHeader show-back-arrow label="Tweet" />
    <!-- <PostsItem v-if="true" :data="fetchedPost" />
    <UIForm :post-id="postId[0]" is-comment placeholder="Tweet your reply" />
    <PostsCommentFeed v-if="fetchedPost" :comments="fetchedPost?.comments" />
    <div v-if="true" class="flex justify-center items-center h-full">
      ClipLoader
    </div> -->
    <div class="bg-dim-600 text-white">**PostItem >> {{ postId }}</div>
  </div>
</template>
