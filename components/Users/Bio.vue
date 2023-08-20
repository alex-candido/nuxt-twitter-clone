<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import useEditModal from '../../services/useEditModal';

defineProps({
  userId: {
    type: String,
    required: true,
  },
})

const toggleFollow = () => {
  return console.log('toggleFollow')
}


</script>
<template>
  <div class="border-b-[1px] border-neutral-800 pb-4">
    <div class="flex justify-end p-2">
      <UIButton
        v-if="true"
        :secondary="false"
        :label="'Edit'"
        @click="useEditModal.onOpen()"
      />
      <UIButton
        v-else
        class="button"
        :label="true ? 'Unfollow' : 'Follow'"
        :class="{
          'button-secondary': true,
          'button-outline': true,
        }"
        :secondary="false"
        :outline="false"
        @click="toggleFollow"
      />
    </div>
    <div class="mt-8 px-4">
      <div class="flex flex-col">
        <p class="text-white text-2xl font-semibold">fetchedUser?.name</p>
        <p class="text-md text-neutral-500">@fetchedUser?.username</p>
      </div>
      <div class="flex flex-col mt-4">
        <p class="text-white">fetchedUser?.bio</p>
        <div class="flex flex-row items-center gap-2 mt-4 text-neutral-500">
          <BiCalendar size="24" />
          <p>Joined createdAt</p>
        </div>
      </div>
      <div class="flex flex-row items-center mt-4 gap-6">
        <div class="flex flex-row items-center gap-1">
          <p class="text-white">fetchedUser?.followingIds?.length || 0</p>
          <p class="text-neutral-500">Following</p>
        </div>
        <div class="flex flex-row items-center gap-1">
          <p class="text-white">fetchedUser?.followersIds?.length || 0</p>
          <p class="text-neutral-500">Followers</p>
        </div>
      </div>
    </div>
  </div>
</template>
