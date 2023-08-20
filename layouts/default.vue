<script lang="ts" setup>
const darkMode = ref(true)
</script>
<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <ModalsLogin />
      <ModalsRegister />
      <ModalsEdit />
      <MainSection>
        <router-view />
      </MainSection>
    </div>
  </div>
</template>
