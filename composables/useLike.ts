/* eslint-disable prettier/prettier */

import useCurrentUser from './useCurrentUser';
import usePost from './usePost';
import useUserPosts from './useUserPosts';

const useLike = ({ postId, userId }: { postId: string; userId: string }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchedPost, execute: mutatePost } = usePost(postId)
  const { execute: mutateUserPosts } = useUserPosts(userId)

  const hasLiked = computed(() => {
    const list = fetchedPost?.likedIds || []

    return list.includes(currentUser?.currentUser.id)
  })

  const toggleLike = async () => {
    if (!currentUser?.currentUser) {
      // return useLoginModal.onOpen()
    }

    try {
      if (hasLiked.value) {
        await useFetch(`/api/like`,{ method: 'DELETE', body: postId || ""  })
      } else {
        await useFetch(`/api/like`,{ method: 'POST', body: postId || ""})
      }

      mutatePost()
      mutateUserPosts()
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
    }
  }

  return {
    hasLiked: hasLiked.value,
    toggleLike,
  }
}

export default useLike
