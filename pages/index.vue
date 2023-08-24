<script lang="ts" setup>
// const { data, status } = useAuth()

const { data: posts, execute: mutatePost } = await usePosts()

onBeforeMount(() => {
  mutatePost()
})
</script>
<template>
  <div>
    <UIHeader label="Home" />
    <UIForm placeholder="What's happening" />
    <PostsFeed :posts="posts" />
  </div>
</template>
