import { createComment } from '../db/comments'
import { createNotification } from '../db/notifications'
import { getPostById } from '../db/posts'
import { notificationUser } from '../db/users'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'POST') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const { id: userId, text } = await readBody(event)
  const { postId } = getQuery(event)
  const currenPostId = postId as string

  if (!userId || !text || !postId) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid data' }),
    )
  }

  try {
    const commentData = {
      text,
      userId,
      postId: currenPostId,
    }

    const comment = await createComment(commentData)
    const post = await getPostById(currenPostId)

    const notificationData = {
      userId,
      statusMessage: 'Someone replied on your tweet!',
    }

    let notification
    let isNotificationUser

    if (post?.userId) {
      notification = await createNotification(notificationData)
      isNotificationUser = await notificationUser(post?.userId)
    }

    return { comment, notification, isNotificationUser }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
