<script lang="ts" setup>
const { data } = useAuth()
</script>
<template>
  <div>
    <UIHeader label="Home" />
    <UIForm placeholder="What's happening" />
    <PostsFeed />
    <div class="bg-dim-600 text-white text-2xl">{{ data?.user }}</div>
  </div>
</template>
