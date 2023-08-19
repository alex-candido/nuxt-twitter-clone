<script lang="ts" setup>
const darkMode = ref(true)
</script>
<template>
  <div :class="{ dark: darkMode }" class="bg-white dark:bg-dim-900">
    <ModalsLogin />
    <MainSection>
      <slot />
    </MainSection>
  </div>
</template>
