import { deleteNotification, getNotificationById } from '../../db/notifications'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'DELETE') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const { notificationId } = await readBody(event)

  const notification = await getNotificationById(notificationId)

  try {
    const deleted = await deleteNotification(notification.id)

    console.log(deleted)
    return { method, deleted }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
