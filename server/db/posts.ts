import { Post } from '@prisma/client'
import prisma from '../libs/prismadb'

export interface PostDataProps {
  id: string
  text: string
}

export const createPost = async ({
  text,
  id,
}: PostDataProps): Promise<Post> => {
  const post = await prisma.post.create({
    data: {
      body: text,
      userId: id,
    },
  })

  if (!post) {
    console.log('Not found post')
  }
  return post
}

export const getPostById = async (postId: string): Promise<any> => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!post) {
    console.log('Not found post')
  }
  return post
}
