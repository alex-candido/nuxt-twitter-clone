import { createPost, getAllPosts } from '../../db/posts'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'POST' && method !== 'GET') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  try {
    if (method === 'POST') {
      const { id, text } = await readBody(event)

      const postData = {
        id,
        text,
      }

      const post = await createPost(postData)

      return {
        method,
        postData: post,
      }
    }

    if (method === 'GET') {
      const currentPosts = await getAllPosts()

      return currentPosts
    }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
