// import { createNotification } from '../db/notifications'
import { createNotification } from '../db/notifications'
import {
  getUserById,
  notificationUser,
  updatedUserFollowers,
  updatedUserFollowing,
} from '../db/users'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'POST' && method !== 'DELETE') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const { userId, isCurrentUser } = await readBody(event)

  const userFollowing = await getUserById(isCurrentUser.id)

  const userFollower = await getUserById(userId)

  let updatedFollowingIds = [...(userFollowing?.followingIds || [])]
  let updatedFollowersIds = [...(userFollower?.followersIds || [])]

  const notificationData = {
    userId: userFollower.id,
    statusMessage: 'Someone followed your profile!',
  }

  try {
    if (method === 'POST') {
      updatedFollowingIds.push(userId)
      updatedFollowersIds.push(isCurrentUser.id)

      if (userFollower.id) {
        await createNotification(notificationData)
        await notificationUser(userFollower.id)
      }
    }

    if (method === 'DELETE') {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId,
      )
      updatedFollowersIds = updatedFollowersIds.filter(
        (followersId) => followersId !== isCurrentUser.id,
      )
    }

    const userFollowingData = {
      userId: isCurrentUser.id,
      updatedFollowingIds,
    }

    const userFollowersData = {
      userId,
      updatedFollowersIds,
    }

    const isUpdatedUserFollowing = await updatedUserFollowing(userFollowingData)

    const isUpdatedUserFollowers = await updatedUserFollowers(userFollowersData)

    return {
      method,
      userId,
      isCurrentUser,
      isUpdatedUserFollowing,
      isUpdatedUserFollowers,
    }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
