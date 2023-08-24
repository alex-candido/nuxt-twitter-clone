import { getPostsByUserId } from '~/server/db/posts'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'GET') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  try {
    const { userId } = getQuery(event)

    if (!userId) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid ID' }),
      )
    }

    let currentPosts

    if (userId && typeof userId === 'string') {
      currentPosts = await getPostsByUserId(userId)
    }

    return {
      currentPosts,
    }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
