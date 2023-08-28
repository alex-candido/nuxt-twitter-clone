import { defineStore } from 'pinia'
import { CurrentPost } from '../types/post'

export const usePostsStore = defineStore('posts-store', {
  state: () => ({
    isPost: {} as CurrentPost | null,
    isPosts: [] as CurrentPost[] | null,
  }),
  getters: {
    getCurrentPosts(state) {
      return state.isPosts
    },
    getCurrentPost(state) {
      return state.isPost
    },
  },
  actions: {
    async setCurrentPosts() {
      const { data: currentPosts } = await usePosts()
      this.isPosts = currentPosts
    },
    async setCurrentPost(postId: string) {
      const { data: currentPost } = await usePost(postId)
      this.isPost = currentPost
    },
  },
})
