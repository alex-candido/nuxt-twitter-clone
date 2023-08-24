<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import usePost from '@/composables/usePost';

const router = useRouter()
const { postId } = router.currentRoute.value.params

const currentPostid = postId as string

const { data: fetchedPost, execute: mutatePost } = await usePost(currentPostid)

onMounted(() => {
  mutatePost()
})
</script>
<template>
  <div>
    <UIHeader show-back-arrow label="Tweet" />

    <PostsItem v-if="postId" :data="fetchedPost as Record<string, any>" />
    <UIForm
      :post-id="currentPostid"
      is-comment
      placeholder="Tweet your reply"
    />
    <PostsCommentFeed v-if="fetchedPost" :comments="fetchedPost?.comments" />

    <div v-if="true" class="flex justify-center items-center h-full">
      ClipLoader
    </div>
  </div>
</template>
