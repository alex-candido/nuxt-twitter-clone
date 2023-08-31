<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../store/user';

defineProps({
  userId: {
    type: String,
    required: true,
  },
})
const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())

const fetchedUser = {
  coverImage: '',
}
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
