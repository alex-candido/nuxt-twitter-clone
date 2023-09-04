<script lang="ts" setup>
import { useDropzone } from 'vue3-dropzone';

const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    required: true,
  },
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

const selectedFile = ref(<Blob | null>null)
// o Problema é aqui
const inputImageUrl = ref(<string | ArrayBuffer | null | undefined>null)

const emits = defineEmits<{
  (e: 'update:modelValue', value: (Blob | null)[]): void
}>()

function handleChange() {
  const mediaFile = [selectedFile.value]

  emits('update:modelValue', mediaFile)
}

const handleDrop = (files: any) => {
  const file = files[0]

  selectedFile.value = file

  const reader = new FileReader()

  reader.onload = (event: any) => {
    inputImageUrl.value = event?.target.result
    handleChange()
  }
  reader.readAsDataURL(file)
}

const { getRootProps, getInputProps,  } = useDropzone({
  maxFiles: 1,
  onDrop: handleDrop,
  disabled: props.disabled,
  accept: 'image/jpeg, image/png',
})

</script>
<template>
  <div
    v-bind="getRootProps()"
    class="w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer hover:opacity-80"
  >
    <input v-bind="getInputProps()" />
    <template v-if="inputImageUrl">
      <div class="flex items-center justify-center">
        <nuxt-img :src="(inputImageUrl as string | undefined)" height="100" width="100" alt="Uploaded image" />
      </div>
    </template>
    <template v-else>
      <p class="text-white">{{ label }}</p>
    </template>
  </div>
</template>
