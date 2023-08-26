export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'POST' && method !== 'DELETE') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const { postId } = await readBody(event)

  console.log({ postId, method })

  return { method, postId }
})
