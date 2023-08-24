import { getUserById } from '../../db/users'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'GET') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  try {
    const userId = getRouterParam(event, 'userId')

    if (!userId) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid ID' }),
      )
    }

    const currentUser = await getUserById(userId)

    return {
      currentUser,
    }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
