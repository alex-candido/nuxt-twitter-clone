<script lang="ts" setup>
const router = useRouter()
const { userId } = router.currentRoute.value.params

// const { data: fetchedUser, isLoading } = useUser(userId)
</script>
<template>
  <div>
    <div v-if="false" class="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size="80" />
    </div>
    <div v-else>
      <UIHeader :show-back-arrow="true" :label="'UserName'" />
      <UsersHero :user-id="userId[0]" />
      <UsersBio :user-id="userId[0]" />
      <PostsFeed :user-id="userId[0]" />
    </div>
  </div>
</template>
