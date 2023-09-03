/* eslint-disable require-await */
export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'PATCH') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }
  return method
})
