<script lang="ts" setup>
const darkMode = ref(true)
</script>
<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <ModalsRegister />
      <ModalsLogin />
      <MainSection>
        <slot />
      </MainSection>
    </div>
  </div>
</template>
