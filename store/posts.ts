import { defineStore } from 'pinia'
import { CurrentPost } from '../types/post'

export const usePostsStore = defineStore('posts-store', {
  state: () => ({
    isPosts: [] as CurrentPost[] | null,
  }),
  getters: {
    getCurrentPosts(state) {
      return state.isPosts
    },
  },
  actions: {
    async setCurrentPosts() {
      const { data: currentPosts } = await usePosts()
      this.isPosts = currentPosts
    },
  },
})
