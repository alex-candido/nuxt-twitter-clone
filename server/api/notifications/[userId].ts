import {
  getNotificationsByUserId,
  updateIsNotificationUser,
} from '../../db/notifications'

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
    const notifications = await getNotificationsByUserId(userId)
    await updateIsNotificationUser(userId)

    return notifications
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
