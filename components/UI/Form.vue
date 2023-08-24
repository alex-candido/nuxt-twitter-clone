<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable import/order -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
// @ts-ignore
import useCurrentUser from '@/composables/useCurrentUser'
// @ts-ignore
import usePost from '@/composables/usePost'
// @ts-ignore
import usePosts from '@/composables/usePosts'
// @ts-ignore
import useSetPost from '@/composables/useSetPost'
// @ts-ignore
import useLoginModal from '@/services/useLoginModal'
// @ts-ignore
import useRegisterModal from '@/services/useRegisterModal'
import { useToastStore } from '../../store/toast'
const { onOpen } = useToastStore()
const { data } = await useCurrentUser()

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  isComment: {
    type: Boolean,
    default: false,
  },
  postId: {
    type: String,
    default: '',
  },
})

const { refresh: mutatePosts } = await usePosts()
const { refresh: mutatePost } = await usePost(props.postId)

const currentPost = reactive({
  text: '',
  isLoading: false,
  errorMsg: '',
})

const onSubmit = async () => {
  try {
    currentPost.isLoading = true

    const url = props.isComment
      ? `/api/comments?postId=${props.postId}`
      : '/api/posts'

    await useSetPost({
      id: data?.currentUser.id,
      url,
      text: currentPost.text,
    })

    currentPost.text = ''
    mutatePosts()
    mutatePost()
    location.reload()
  } catch (error) {
    if (error instanceof Error) {
      currentPost.errorMsg = error.message
    }
  } finally {
    currentPost.isLoading = false
  }
}

console.log(props.postId)

const handleSubmit = () => {
  onSubmit()
  onOpen('Tweet Created!')
}
</script>

<template>
  <div class="border-b-[1px] border-neutral-600 px-5 py-2">
    <template v-if="data?.currentUser">
      <div class="flex flex-row gap-4">
        <div>
          <UIAvatar :user-id="data?.currentUser.id" />
        </div>
        <div class="w-full">
          <textarea
            v-model="currentPost.text"
            :disabled="currentPost.isLoading"
            class="disabled:opacity-80 peer resize-none mt-3 w-full bg-white dark:bg-dim-900 ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
            :placeholder="props.placeholder"
          ></textarea>
          <hr
            class="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-600 transition"
          />
          <div class="mt-4 flex flex-row justify-end">
            <UIButton
              :disabled="currentPost.isLoading || !currentPost.text"
              label="Tweet"
              @click="handleSubmit"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="py-8">
        <h1 class="text-white text-2xl text-center mb-4 font-bold">
          Welcome to Twitter
        </h1>
        <div class="flex flex-row items-center justify-center gap-4">
          <UIButton label="Login" @click="useLoginModal.onOpen()" />
          <UIButton label="Register" @click="useRegisterModal.onOpen()" />
        </div>
      </div>
    </template>
  </div>
</template>
