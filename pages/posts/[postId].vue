<!-- eslint-disable import/order -->
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../../store/posts';

const router = useRouter()
const { postId } = router.currentRoute.value.params
const currentPostid = postId as string

const { setCurrentPost } = usePostsStore()
const { getCurrentPost: currentPost } = storeToRefs(usePostsStore())

onBeforeMount(async () => {
  await setCurrentPost(currentPostid)
})
</script>
<template>
  <div>
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
</template>
