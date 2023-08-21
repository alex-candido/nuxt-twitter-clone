/* eslint-disable import/order */
import { getServerSession } from '#auth'
import { getUserByEmail } from '../db/users'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'GET') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }
  const session = await getServerSession(event)

  if (!session?.user?.email) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'unauthenticated' }),
    )
  }

  const currentUser = await getUserByEmail(session.user.email)

  if (!currentUser) {
    throw new Error('Not signed in')
  }

  return {
    currentUser,
  }
})
