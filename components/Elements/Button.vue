<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface ButtonProps {
  label: string
  secondary?: boolean
  fullWidth?: boolean
  large?: boolean
  disabled?: boolean
  outline?: boolean
}

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  outline: {
    type: Boolean,
    default: false,
  },
}) as ButtonProps

const emits = defineEmits<{
  (e: 'onClick', value: Event): void
}>()

function onClick(event: Event) {
  emits('onClick', event)
}

const buttonClasses = computed(() => {
  return [
    props.secondary ? 'bg-white' : 'bg-sky-500',
    props.secondary ? 'text-black' : 'text-white',
    props.secondary ? 'border-black' : 'border-sky-500',
    props.large ? 'text-xl' : 'text-md',
    props.large ? 'px-5' : 'px-4',
    props.large ? 'py-3' : 'py-2',
    props.outline ? 'bg-transparent' : '',
    props.outline ? 'border-white' : '',
    props.outline ? 'text-white' : '',
  ]
})
</script>

<template>
  <button
    :disabled="props.disabled"
    class="disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2"
    :class="buttonClasses"
    @click="onClick"
  >
    {{ props.label }}
  </button>
</template>
