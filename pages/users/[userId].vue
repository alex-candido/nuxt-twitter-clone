<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/user'

const router = useRouter()
const { userId: currentUserId } = router.currentRoute.value.params
const userId = currentUserId as string

const { setUser } = useUserStore()
const { getUser: fetchedUser } = storeToRefs(useUserStore())

onBeforeMount(async () => {
  await setUser(userId)
})

console.log(fetchedUser.value)
</script>
<template>
  <div>
    <div v-if="false" class="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size="80" />
    </div>
    <div v-else>
      <UIHeader :show-back-arrow="true" :label="fetchedUser?.name" />
      <UsersHero :user-id="userId" />
      <UsersBio :user-id="userId" />
      <PostsFeed :user-id="userId" />
    </div>
  </div>
</template>
