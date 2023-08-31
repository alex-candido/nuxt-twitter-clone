import { createNotification } from '../db/notifications'
import { getPostById, updatedPost } from '../db/posts'
import { notificationUser } from '../db/users'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'POST' && method !== 'DELETE') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const { postId, isCurrentUser } = await readBody(event)

  const post = await getPostById(postId)

  let updatedLikedIds = [...(post.likedIds || [])]

  const notificationData = {
    userId: post.userId,
    statusMessage: 'Someone liked your tweet!',
  }

  try {
    if (method === 'POST') {
      updatedLikedIds.push(isCurrentUser.id)

      if (post.userId) {
        await createNotification(notificationData)
        await notificationUser(post?.userId)
      }
    }

    if (method === 'DELETE') {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== isCurrentUser?.id,
      )
    }

    const postData = {
      postId,
      updatedLikedIds,
    }

    const isUpdatedPost = await updatedPost(postData)

    return { method, postId, isCurrentUser, isUpdatedPost }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
