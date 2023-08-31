/* eslint-disable import/order */
import { updateIsNotificationUser } from '../../db/notifications'
import { getNotificationsByUserId } from '../../db/notifications'

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
    const NotificationUser = await updateIsNotificationUser(userId)

    console.log({ notifications, NotificationUser })
    return notifications
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
