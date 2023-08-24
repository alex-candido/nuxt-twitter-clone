<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import useUsers from '../../composables/useUsers'

const { data: users } = await useUsers()
</script>
<template>
  <div class="h-screen px-6 py-4 hidden lg:block dark:bg-dim-900">
    <div class="bg-neutral-800 rounded-xl p-4">
      <div class="text-white text-xl font-semibold">
        <div class="flex flex-col gap-6 mt-4">
          <div v-for="user in users" :key="user.id" class="flex flex-row gap-4">
            <UIAvatar :user-id="user.id" />
            <div class="flex flex-col">
              <p class="text-white font-semibold text-sm">{{ user.name }}</p>
              <p class="text-neutral-400 text-sm">@{{ user.username }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
