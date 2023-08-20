<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  actionLabel: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const handleClose = () => {
  if (props.disabled) {
    return
  }

  props.onClose()
}

const isOpen = computed(() => {
  return props.isOpen
})

const handleSubmit = () => {
  if (props.disabled) {
    return
  }

  props.onSubmit()
}
</script>
<template>
  <div
    v-if="isOpen"
    class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800bg-opacity-70"
  >
    <div
      class="relative w-full md:w-3/6 my-6 mx-auto md:max-w-3xl h-full md:h-auto max-w-2xl max-h-full"
    >
      <!-- content -->
      <div
        class="h-full lg:h-auto border-2 border-neutral-600 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-dim-900 outline-none focus:outline-none"
      >
        <!-- header -->
        <div class="flex items-center justify-between p-10 rounded-t">
          <h3 class="text-3xl font-semibold text-white">{{ title }}</h3>
          <button
            class="p-1 ml-auto border-0 text-white hover:opacity-70 transition"
            @click="handleClose"
          >
            <Icon name="line-md:close" size="1.5rem" color="white" />
          </button>
        </div>

        <!-- body -->
        <div class="relative p-10 flex-auto">
          <slot></slot>
        </div>

        <!-- footer -->
        <div class="flex flex-col gap-2 p-10">
          <UIButton
            :disabled="disabled"
            :label="actionLabel"
            :secondary="false"
            full-width
            large
            @click="handleSubmit"
          />
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
