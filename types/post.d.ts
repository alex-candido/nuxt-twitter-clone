import { Comment } from "./comment"
import { User } from "./user"

export interface CurrentPost {
  id: string
  body: string
  createdAt: Date
  updatedAt: Date
  userId: string
  likedIds: string[]
  image: string | null

  user: User

  comments: Comment[]
}
