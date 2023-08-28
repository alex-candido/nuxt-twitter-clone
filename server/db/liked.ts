import prisma from '../libs/prismadb'

export interface CreateLikedProps {
  userId: string
  postId: string
}

export const createLiked = async (postData: CreateLikedProps): Promise<any> => {
  const liked = await prisma.likes.create({
    data: {
      userId: postData.userId,
      postId: postData.postId,
    },
  })

  if (!liked) {
    console.log('Not create Liked')
  }
  return liked
}

export const deleteLiked = async (postId: string): Promise<any> => {
  const liked = await prisma.likes.delete({
    where: {
      id: postId,
    },
  })

  if (!liked) {
    console.log('Not deleted Liked')
  }
  return liked
}
