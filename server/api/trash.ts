import { deletePost, getPostById } from '../db/posts'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'DELETE') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const { postId } = await readBody(event)

  const post = await getPostById(postId)

  try {
    const deleted = await deletePost(post.id)

    console.log(deleted)
    return { method, deleted }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
