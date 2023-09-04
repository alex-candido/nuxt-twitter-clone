<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  const newValue = (event.target as HTMLInputElement).value
  emits('update:modelValue', newValue)
}
</script>

<template>
  <div class="w-full">
    <label v-if="label" for="" class="text-xl text-white font-semibold mb-2">
      {{ label }}
    </label>
    <input
      :v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full p-4 text-lg dark:bg-dim-900 border-2 border-neutral-600 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
      @input="handleInput"
    />
  </div>
</template>
