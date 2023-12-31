/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable require-await */

import { getAllUsers } from '../../db/users'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'GET') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  try {

    const currentUsers = await getAllUsers()

    return currentUsers
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
