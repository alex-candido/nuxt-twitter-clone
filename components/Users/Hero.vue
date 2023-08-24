<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})
const fetchedUser = {
  coverImage: '',
}

console.log(props.userId)
</script>
<template>
  <div>
    <div class="bg-neutral-700 h-44 relative">
      <nuxt-img
        v-if="fetchedUser.coverImage"
        :src="fetchedUser.coverImage"
        fill
        alt="Cover Image"
        style="object-fit: cover"
      />
      <div class="absolute -bottom-16 left-4">
        <UIAvatar :user-id="userId" is-large has-border />
      </div>
    </div>
  </div>
</template>
