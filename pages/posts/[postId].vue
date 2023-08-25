<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import usePost from '../../composables/usePost';

const router = useRouter()
const { postId } = router.currentRoute.value.params

const currentPostid = postId as string

const { data: fetchedPost, pending: isLoading } = await usePost(currentPostid)
</script>
<template>
  <div>
    <div
      v-if="isLoading && !fetchedPost"
      class="flex justify-center items-start h-full pt-32"
    >
      <UISpinner />
    </div>
    <div v-else>
      <UIHeader show-back-arrow label="Tweet" />

      <PostsItem v-if="postId" :data="fetchedPost as Record<string, any>" />
      <UIForm
        :post-id="currentPostid"
        :is-comment="true"
        placeholder="Tweet your reply"
      />
      <PostsCommentFeed v-if="fetchedPost" :comments="fetchedPost?.comments" />
    </div>
  </div>
</template>
