<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable import/order -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable require-await -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import useCurrentUser from '../../composables/useCurrentUser'
import useSetPost from '../../composables/useSetPost'
import useLoginModal from '../../services/useLoginModal'
import useRegisterModal from '../../services/useRegisterModal'
import { usePostsStore } from '../../store/posts'
import { useToastStore } from '../../store/toast'

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
  details: {
    type: Boolean,
    default: false,
  },
})


const { onOpen } = useToastStore()
const { data: currentUser } = await useCurrentUser()

const { setCurrentPosts, setCurrentPost } = usePostsStore()
await setCurrentPost({postId: props.postId})

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
      id: currentUser?.id,
      url,
      text: currentPost.text,
    })

    currentPost.text = ''
    await setCurrentPosts()
    await setCurrentPost({postId: props.postId})

    // if (props.details) {
    //   location.reload()
    // }
  } catch (error) {
    if (error instanceof Error) {
      currentPost.errorMsg = error.message
    }
  } finally {
    currentPost.isLoading = false
  }
}

const handleSubmit = () => {
  onSubmit()
  if (props.isComment) {
    onOpen('Comment Created!')
  } else {
    onOpen('Tweet Created!')
  }
}
</script>

<template>
  <div class="border-b-[1px] border-neutral-600 px-5 py-2">
    <div v-show="currentUser?.id" class="flex flex-row gap-4">
      <div>
        <UIAvatar
          :profile-image="currentUser?.profileImage || ''"
          image
          :user-id="currentUser?.id"
        />
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
    <div v-show="!currentUser?.id" class="py-8">
      <h1 class="text-white text-2xl text-center mb-4 font-bold">
        Welcome to Twitter
      </h1>
      <div class="flex flex-row items-center justify-center gap-4">
        <UIButton label="Login" @click="useLoginModal.onOpen()" />
        <UIButton label="Register" @click="useRegisterModal.onOpen()" />
      </div>
    </div>
  </div>
</template>
