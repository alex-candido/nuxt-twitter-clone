import { defineStore } from 'pinia'
import { CurrentPost } from '../types/post'

export const usePostStore = defineStore('posts-store', {
  state: () => ({
    isPost: {} as CurrentPost | null,
  }),
  getters: {
    getCurrentPost(state) {
      return state.isPost
    },
  },
  actions: {
    async setCurrentPost(postId: string) {
      const { data: currentPost } = await usePost(postId)
      this.isPost = currentPost
    },
  },
})
