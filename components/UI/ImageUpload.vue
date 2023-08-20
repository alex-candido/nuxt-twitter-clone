<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { useDropzone } from 'vue3-dropzone';
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const base64 = ref(props.value)

const handleDrop = (files: any) => {
  const file = files[0]
  const reader = new FileReader()

  reader.onload = (event: any) => {
    base64.value = event?.target.result
  }
  reader.readAsDataURL(file)
}

const { getRootProps, getInputProps } = useDropzone({
  maxFiles: 1,
  onDrop: handleDrop,
  disabled: props.disabled,
  accept: 'image/jpeg, image/png',
})

const emits = defineEmits<{
  (e: 'update:value', value: string): void
}>()

function handleInput(event: Event) {
  const newValue = (event.target as HTMLInputElement).value
  emits('update:value', newValue)
}
</script>
<template>
  <div
    v-bind="getRootProps"
    class="w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer hover:opacity-80"
  >
    <input v-bind="getInputProps" @input="handleInput" />
    <template v-if="base64">
      <div class="flex items-center justify-center">
        <nuxt-img :src="base64" height="100" width="100" alt="Uploaded image" />
      </div>
    </template>
    <template v-else>
      <p class="text-white">{{ label }}</p>
    </template>
  </div>
</template>
