// import { createNotification } from '../db/notifications'
// import { getUserById, notificationUser, updatedUser } from '../db/users'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'POST' && method !== 'DELETE') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const { userId, isCurrentUser } = await readBody(event)

  // const user = await getUserById(userId)

  // let updatedFollowingIds = [...(user.followingIds || [])]

  // const notificationData = {
  //   userId: user.id,
  //   statusMessage: 'Someone followed your profile!',
  // }

  try {
    // if (method === 'POST') {
    //   updatedFollowingIds.push(isCurrentUser.id)

    //   if (user.id) {
    //     await createNotification(notificationData)
    //     await notificationUser(user.id)
    //   }
    // }

    // if (method === 'DELETE') {
    //   updatedFollowingIds = updatedFollowingIds.filter(
    //     (followId) => followId !== isCurrentUser?.id,
    //   )
    // }

    // const userData = {
    //   userId,
    //   updatedFollowingIds,
    // }

    // const isUpdatedUser = await updatedUser(userData)

    // return { method, userId, isCurrentUser, isUpdatedUser }
    console.log({ userId, method, isCurrentUser })
    return { userId, isCurrentUser }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
