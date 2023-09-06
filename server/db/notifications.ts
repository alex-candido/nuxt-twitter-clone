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

export const getNotificationById = async (
  notificationId: string,
): Promise<any> => {
  const notification = await prisma.notification.findUnique({
    where: {
      id: notificationId,
    },
    include: {
      user: true,
    },
  })

  if (!notification) {
    console.log('Not found post')
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

export const updateIsNotificationUser = async (
  userId: string,
): Promise<any> => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hasNotification: false,
    },
  })

  if (!user) {
    console.log('Not found users')
  }
  return user
}

export const deleteNotification = async (notificationId: string) => {
  const notification = await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  })

  return notification
}
