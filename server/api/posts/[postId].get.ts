import { getPostById } from '../../db/posts'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'GET') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  try {
    const postId = getRouterParam(event, 'postId')

    if (!postId) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid ID' }),
      )
    }

    const currentPost = await getPostById(postId)

    return currentPost
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
