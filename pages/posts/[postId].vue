<!-- eslint-disable import/order -->
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '../../store/posts'

// import usePost from '../../composables/usePost'

const router = useRouter()
const { postId } = router.currentRoute.value.params
const currentPostid = postId as string

// const { data: fetchedPost, pending: isLoading } = await usePost(currentPostid)

const { setCurrentPost } = usePostsStore()
// const { setCurrentPost } = usePostStore()
const { getCurrentPost: currentPost } = storeToRefs(usePostsStore())

await setCurrentPost(currentPostid)

console.log(currentPost.value)
</script>
<template>
  <div>
    <div
      v-if="!currentPost"
      class="flex justify-center items-start h-full pt-32"
    >
      <UISpinner />
    </div>
    <div v-else>
      <UIHeader show-back-arrow label="Tweet" />

      <PostsItem
        v-if="postId"
        :data="currentPost as Record<string, any>"
        :details="true"
      />
      <UIForm
        :post-id="currentPostid"
        :is-comment="true"
        placeholder="Tweet your reply"
        :details="true"
      />
      <PostsCommentFeed v-if="currentPost" :comments="currentPost?.comments" />
    </div>
  </div>
</template>
