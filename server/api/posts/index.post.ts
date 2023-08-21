import { createPost } from '../../db/posts'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'POST') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const body = await readBody(event)

  const { id, text } = body

  if (!text) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid credentials' }),
    )
  }

  try {
    const postData = {
      id,
      text,
    }

    const post = await createPost(postData)

    return {
      method,
      postData: post,
    }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
