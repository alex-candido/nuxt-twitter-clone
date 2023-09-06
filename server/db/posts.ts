import { Post } from '@prisma/client'
import prisma from '../libs/prismadb'

export interface PostDataProps {
  id: string
  text: string
}

export interface UpdatedPostProps {
  postId: string
  updatedLikedIds: string[]
}

export const createPost = async (postData: PostDataProps): Promise<Post> => {
  const post = await prisma.post.create({
    data: {
      body: postData.text,
      userId: postData.id,
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

export const getPostsByUserId = async (userId: string): Promise<any> => {
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!posts) {
    console.log('Not found posts')
  }
  return posts
}

export const getAllPosts = async (): Promise<any> => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!posts) {
    console.log('Not found posts')
  }
  return posts
}

export const updatedPost = async (postData: UpdatedPostProps): Promise<any> => {
  const post = await prisma.post.update({
    where: {
      id: postData.postId,
    },
    data: {
      likedIds: postData.updatedLikedIds,
    },
  })

  if (!post) {
    console.log('Not found post')
  }
  return post
}

export const deletePost = async (postId: string) => {
  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  })

  return post
}
