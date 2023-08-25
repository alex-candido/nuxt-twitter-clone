import useLoginModal from '../services/useLoginModal'
import useSetLike from './useSetLike'

/* eslint-disable @typescript-eslint/no-unused-vars */
interface LikePayloadInterface {
  postId: string
  userId: string
}

const useLike = async ({
  postId,
  userId,
}: {
  postId: string
  userId: string
}) => {
  const { data: currentUser } = await useCurrentUser()
  const { data: fetchedPost, execute: mutatePost } = await usePost(postId)
  const { execute: mutatePosts } = await useUserPosts(userId)

  const hasLiked = computed(() => {
    const list = fetchedPost?.likedIds || []

    return list.includes(currentUser?.currentUser.id)
  })

  const toggleLike = async () => {
    if (!currentUser?.currentUser) {
      return useLoginModal.onOpen()
    }

    try {
      if (hasLiked.value) {
        await useSetLike({ postId, method: 'DELETE' })
      } else {
        await useSetLike({ postId, method: 'POST' })
      }

      await mutatePost()
      await mutatePosts()

      return {}
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike
