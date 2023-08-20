<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  showBackArrow: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<template>
  <div class="border-b-[1px] border-neutral-600 p-5">
    <div class="flex flex-row items-center gap-2">
      <template v-if="props.showBackArrow">
        <Icon
          name="ion:arrow-back-outline"
          size="1.5rem"
          color="white"
          @click="handleBack"
        />
      </template>
      <h1 class="text-white text-xl font-semibold">{{ props.label }}</h1>
    </div>
  </div>
</template>
