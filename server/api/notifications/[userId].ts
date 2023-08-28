/* eslint-disable require-await */
/* eslint-disable import/order */

// import { getNotificationsByUserId } from '../../db/notifications'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'GET') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const userId = getRouterParam(event, 'userId')

  try {
    // const notifications = await getNotificationsByUserId(userId)
    // await updateIsNotificationUser(userId)

    return { method, userId }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
