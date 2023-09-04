<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String as PropType<string | null | undefined>,
    required: true,
  },
  isLarge: {
    type: Boolean,
    default: false,
  },
  hasBorder: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

const goToUser = (event: any) => {
  event.stopPropagation()

  const url = `/users/${props.userId}`

  router.push(url)
}
</script>

<template>
  <div
    :class="[
      props.hasBorder ? 'border-4 border-neutral-600' : '',
      props.isLarge ? 'h-32' : 'h-12',
      props.isLarge ? 'w-32' : 'w-12',
      'rounded-full',
      'hover:opacity-90',
      'transition',
      'cursor-pointer',
      'relative',
      'flex-none',
    ]"
  >
    <nuxt-img
      fill
      style="object-fit: cover; border-radius: 100%"
      class="absolute inset-0 object-cover w-full h-full"
      alt="Avatar"
      :src="profileImage || '/images/placeholder.png'"
      @click="goToUser"
    />
  </div>
</template>
