import prisma from '../libs/prismadb'

export interface NotificationDataProps {
  userId: string
  statusMessage: string
}

export const createNotification = async (
  notificationData: NotificationDataProps,
): Promise<any> => {
  const notification = await prisma.notification.create({
    data: {
      body: notificationData.statusMessage,
      userId: notificationData.userId,
    },
  })

  if (!notification) {
    throw new Error('Not found user')
  }

  return notification
}
