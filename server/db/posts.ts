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
    console.log('Not found user')
  }
  return post
}
