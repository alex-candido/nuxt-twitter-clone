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

export const getNotificationsByUserId = async (
  userId: string,
): Promise<any> => {
  const notifications = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!notifications) {
    throw new Error('Not found user')
  }

  return notifications
}
