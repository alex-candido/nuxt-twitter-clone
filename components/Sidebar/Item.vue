<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useLoginModal from '../../services/useLoginModal'
import { useUserStore } from '../../store/user'
const { setCurrentuser } = useUserStore()

const { getCurrenUser: isCurrentUser } = storeToRefs(useUserStore())

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    default: null,
  },
  auth: {
    type: Boolean,
    default: false,
  },
  alert: {
    type: Boolean as PropType<Boolean | null | undefined>,
    default: false,
  },
  size: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const handleClick = async () => {
  if (props.onClick) {
    return props.onClick()
  }

  if (props.auth && !isCurrentUser.value?.id) {
    useLoginModal.onOpen()
  } else if (props.href) {
    router.push(props.href)
  }
  await setCurrentuser()
}
</script>
<template>
  <div class="flex flex-grow items-center" @click="handleClick">
    <div
      class="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"
    >
      <Icon :name="props.icon" :size="props.size" color="white" />
      <Icon
        v-if="alert"
        name="octicon:dot-fill-16"
        size="1.3rem"
        class="text-sky-500 absolute top-3 left-6"
      />
    </div>
    <div
      class="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer"
    >
      <Icon :name="props.icon" :size="props.size" color="white" />
      <p class="hidden lg:block text-white text-xl">
        {{ props.label }}
      </p>
      <Icon
        v-if="alert"
        name="octicon:dot-fill-16"
        size="1.3rem"
        class="text-sky-500 absolute top-3 left-6"
      />
    </div>
  </div>
</template>
