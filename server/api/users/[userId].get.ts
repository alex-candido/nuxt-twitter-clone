/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable require-await */

import { getUserById } from '../../db/users'

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

    console.log(userId)


    const currentUser = await getUserById(userId)

    console.log(currentUser)

    return currentUser
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
