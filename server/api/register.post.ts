import { createUser } from '../db/users'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'POST') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const body = await readBody(event)

  const { email, name, username, password } = body

  if (!email || !name || !username || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid credentials' }),
    )
  }

  try {
    const userData = {
      email,
      name,
      username,
      hashedPassword: password,
    }

    const user = await createUser(userData)

    console.log(userData)

    return {
      method,
      userData: user,
    }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
