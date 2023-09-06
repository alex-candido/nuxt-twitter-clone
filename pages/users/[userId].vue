<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../store/user';
import { CurrentUser } from '../../types/user';

const router = useRouter()
const { setUser } = useUserStore()
const { getUser: fetchedUser } = storeToRefs(useUserStore())

const currentUser = ref({} as CurrentUser | null)

watchEffect(async () => {
  if (router.currentRoute.value.params.userId) {
    await setUser({ userId: router.currentRoute.value.params.userId as string })
    currentUser.value = fetchedUser.value
  }
})

onBeforeMount(async() => {
  if (router.currentRoute.value.params.userId) {
    await setUser({ userId: router.currentRoute.value.params.userId as string })
    currentUser.value = fetchedUser.value
  }
})
</script>
<template>
  <div>
    <div
      v-show="!fetchedUser"
      class="flex h-screen justify-center items-center"
    >
      <UISpinner />
    </div>
    <div v-show="fetchedUser">
      <UIHeader :show-back-arrow="true" :label="fetchedUser?.name" />
      <UsersHero :user-id="router.currentRoute.value.params.userId as string" />
      <UsersBio :user-id="router.currentRoute.value.params.userId as string" />
      <UsersFeed :user-id="router.currentRoute.value.params.userId as string" />
    </div>
  </div>
</template>
