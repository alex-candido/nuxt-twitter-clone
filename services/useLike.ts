/* eslint-disable prettier/prettier */
import { like } from '../store/like';
import useLoginModal from './useLoginModal';

const useLike = ({ postId, userId }: { postId: string; userId: string }) => {
  const { isCurrentUser, isCurrentPost, getCurrentUser, getCurrentPostById } =
    like()
  getCurrentUser()
  getCurrentPostById(postId)

  const hasLiked = computed(() => {
    const list = isCurrentPost?.likedIds || []
    if (isCurrentUser?.id) {
      return list.includes(isCurrentUser?.id)
    }
  })

  const toggleLike = async () => {
    if (!isCurrentUser) {
      return useLoginModal.onOpen()
    }

    try {
      if (hasLiked.value) {
        await useFetch(`/api/like`, { method: 'DELETE', body: { postId } })
      } else {
        await useFetch(`/api/like`,{ method: 'POST', body: { postId }})
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
    }
  }

  return {
    hasLiked: hasLiked.value,
    toggleLike,
    userId,
  }
}

export default useLike
