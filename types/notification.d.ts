import { User } from './user'

export interface Notification {
  id: string
  body: string
  userId: string
  createdAt: Date

  user: User
}
