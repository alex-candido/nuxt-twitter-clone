import * as bcrypt from 'bcrypt'
import prisma from '../libs/prismadb'

export interface UserDataProps {
  username: string
  email: string
  hashedPassword: string
  name: string | null
}

export const createUser = async (userData: UserDataProps) => {
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
