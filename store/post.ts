import { defineStore, skipHydrate } from 'pinia'
import { CurrentPost } from '../types/post'

// export const usePostStore = defineStore('post', {
//   state: () => ({
//     isPost: {} as CurrentPost | null,
//   }),
//   getters: {
//     getCurrentPost(state) {
//       return state.isPost
//     },
//   },
//   actions: {
//     async setCurrentPost(postId: string) {
//       const { data: currentPost } = await usePost(postId)
//       this.isPost = currentPost
//     },
//   },
// })

export const usePostStore = defineStore('post-store', () => {
  const isPost = ref({} as CurrentPost | null)

  const getCurrentPost = () => {
    return isPost.value
  }

  const setCurrentPost = async (postId: string) => {
    const { data: currentPost } = await usePost(postId)
    isPost.value = currentPost
  }

  return {
    isToast: skipHydrate(isPost),
    setCurrentPost,
    getCurrentPost,
  }
})
