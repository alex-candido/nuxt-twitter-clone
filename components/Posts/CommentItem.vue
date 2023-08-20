<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { formatDistanceToNowStrict } from 'date-fns';

const props = defineProps({
  data: {
    type: Object as () => Record<string, any>,
    default: () => ({}),
  },
})

const router = useRouter()

const goToUser = (event: MouseEvent) => {
  event.stopPropagation()
  router.push(`/users/${props.data.user.id}`)
}

const createdAt = formatDistanceToNowStrict(new Date(props.data.createdAt))
</script>
<template>
  <div
    class="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    @click="goToUser"
  >
    <div class="flex flex-row items-start gap-3">
      <Avatar :user-id="data.user.id" />
      <div>
        <div class="flex flex-row items-center gap-2">
          <p class="text-white font-semibold cursor-pointer hover:underline">
            {{ data.user.name }}
          </p>
          <span
            class="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >@{{ data.user.username }}</span
          >
          <span class="text-neutral-500 text-sm">{{ createdAt }}</span>
        </div>
        <div class="text-white mt-1">{{ data.body }}</div>
      </div>
    </div>
  </div>
</template>
