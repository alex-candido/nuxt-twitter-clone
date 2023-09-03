import { defineStore } from 'pinia'
import { CurrentPost } from '../types/post'

export const usePostsStore = defineStore('posts-store', {
  state: () => ({
    isPost: {} as CurrentPost | null,
    isPosts: [] as CurrentPost[] | null,
    isUserPosts: [] as CurrentPost[] | null,
  }),
  getters: {
    getCurrentPosts(state) {
      return state.isPosts
    },
    getCurrentPost(state) {
      return state.isPost
    },
    getCurrentUserPosts(state) {
      return state.isUserPosts
    },
  },
  actions: {
    async setCurrentPosts() {
      const { data: currentPosts } = await usePosts()
      this.isPosts = currentPosts
    },
    resetCurrentPosts() {
      this.isPosts = []
    },
    async setCurrentUserPosts({
      userId,
    }: {
      userId: string | null | undefined
    }) {
      const { data: currentPosts } = await useUserPosts({ userId })
      this.isUserPosts = currentPosts
    },
    async setCurrentPost({ postId }: { postId: string }) {
      const { data: currentPost } = await usePost(postId)
      this.isPost = currentPost
    },
  },
})
