import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import prisma from '../libs/prismadb'

export interface UserDataProps {
  username: string
  email: string
  hashedPassword: string
  name: string | null
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