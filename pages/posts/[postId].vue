<!-- eslint-disable import/order -->
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../../store/posts';

const router = useRouter()
const { setCurrentPost } = usePostsStore()
const { getCurrentPost: currentPost } = storeToRefs(usePostsStore())

watchEffect(async () => {
  if(router.currentRoute.value.params.postId){
    await setCurrentPost({
      postId: router.currentRoute.value.params.postId as string,
    })
  }
})

onBeforeMount(async () => {
  if (router.currentRoute.value.params.postId) {
    await setCurrentPost({
      postId: router.currentRoute.value.params.postId as string,
    })
  }
})

console.log(router.currentRoute.value.params.postId)
</script>
<template>
  <div>
    <UIHeader show-back-arrow label="Tweet" />

    <PostsItem
      v-if="router.currentRoute.value.params.postId"
      :data="currentPost as Record<string, any>"
      :details="true"
    />
    <UIForm
      :post-id="router.currentRoute.value.params.postId as string"
      :is-comment="true"
      placeholder="Tweet your reply"
      :details="true"
    />
    <PostsCommentFeed v-if="currentPost" :comments="currentPost?.comments" />
  </div>
</template>
