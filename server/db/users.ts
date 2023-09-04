import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import prisma from '../libs/prismadb'

export interface UserDataProps {
  username: string
  email: string
  hashedPassword: string
  name: string | null
}

export interface UpdatedUserFollowingProps {
  userId: string
  updatedFollowingIds: string[]
}

export interface UpdatedUserEditProps {
  userId: string
  name: string
  username: string
  bio: string
  profileImage: string
  coverImage: string
}

export interface UpdatedUserFollowersProps {
  userId: string
  updatedFollowersIds: string[]
}

export const createUser = async (userData: UserDataProps): Promise<User> => {
  const finalUserData = {
    ...userData,
    hashedPassword: bcrypt.hashSync(userData.hashedPassword, 10),
  }

  const user = await prisma.user.create({
    data: finalUserData,
  })

  if (!user) {
    console.log('Not found user')
  }
  return user
}

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error('Not found user')
  }

  return user
}

export const getUserById = async (userId: string): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    console.log('Not found user')
  }
  return user
}

export const getAllUsers = async (): Promise<any> => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!users) {
    console.log('Not found users')
  }
  return users
}

export const notificationUser = async (userId: string): Promise<any> => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hasNotification: true,
    },
  })

  if (!user) {
    console.log('Not found users')
  }
  return user
}

export const updatedUserFollowing = async (
  userData: UpdatedUserFollowingProps,
): Promise<any> => {
  const user = await prisma.user.update({
    where: {
      id: userData.userId,
    },
    data: {
      followingIds: userData.updatedFollowingIds,
    },
  })

  if (!user) {
    console.log('Not found user')
  }
  return user
}

export const updatedUserFollowers = async (
  userData: UpdatedUserFollowersProps,
): Promise<any> => {
  const user = await prisma.user.update({
    where: {
      id: userData.userId,
    },
    data: {
      followersIds: userData.updatedFollowersIds,
    },
  })

  if (!user) {
    console.log('Not found user')
  }
  return user
}

export const updatedUserEdit = async (
  userData: UpdatedUserEditProps,
): Promise<any> => {
  const user = await prisma.user.update({
    where: {
      id: userData.userId,
    },
    data: {
      name: userData.name,
      username: userData.username,
      bio: userData.bio,
      profileImage: userData.profileImage,
      coverImage: userData.coverImage,
    },
  })

  if (!user) {
    console.log('Not found user')
  }
  return user
}
