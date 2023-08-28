<script lang="ts" setup>
const router = useRoute()
const userId = router.params.userId as string
</script>
<template>
  <div>
    <div v-if="false" class="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size="80" />
    </div>
    <div v-else>
      <UIHeader :show-back-arrow="true" :label="'UserName'" />
      <UsersHero :user-id="userId" />
      <UsersBio :user-id="userId" />
      <PostsFeed :user-id="userId" />
    </div>
  </div>
</template>
