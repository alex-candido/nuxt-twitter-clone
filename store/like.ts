import { defineStore } from 'pinia'
import { CurrentPost } from '../types/post'
import { CurrentUser } from '../types/user'

export const like = defineStore('currentUser', () => {
  const isCurrentUser = ref({} as CurrentUser | null)
  const isCurrentPost = ref({} as CurrentPost | null)

  const getCurrentUser = async () => {
    const { data: currentUser } = await useCurrentUser()
    isCurrentUser.value = currentUser
  }

  const getCurrentPostById = async (postId: string) => {
    const { data: currentPost } = await usePost(postId)
    isCurrentPost.value = currentPost
  }

  return {
    isCurrentUser,
    isCurrentPost,
    getCurrentUser,
    getCurrentPostById,
  }
})
