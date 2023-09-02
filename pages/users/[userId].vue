<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../store/user';
import { CurrentUser } from '../../types/user';

const route = useRoute()
const { setUser } = useUserStore()
const { getUser: fetchedUser, isLoading } = storeToRefs(useUserStore())

const currentUser = ref({} as CurrentUser | null)

watchEffect(async() => {
  if(route.params.userId) {
    await setUser({userId: route.params.userId as string})
    currentUser.value = fetchedUser.value
  }
})

</script>
<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size="80" />
    </div>
    <div v-else>
      <UIHeader :show-back-arrow="true" :label="currentUser?.name" />
      <UsersHero :user-id="route.params.userId as string" />
      <UsersBio :user-id="route.params.userId as string" />
      <PostsFeed :user-id="route.params.userId as string" />
    </div>
  </div>
</template>
