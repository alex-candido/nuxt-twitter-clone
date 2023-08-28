import prisma from '../libs/prismadb'

export interface CommentDataProps {
  text: string
  userId: string
  postId: string
}

export const createComment = async (
  commentData: CommentDataProps,
): Promise<any> => {
  const comment = await prisma.comment.create({
    data: {
      body: commentData.text,
      userId: commentData.userId,
      postId: commentData.postId,
    },
  })

  if (!comment) {
    console.log('Not found post')
  }
  return comment
}
