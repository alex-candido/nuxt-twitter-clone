import { Post } from "./post"
import { User } from "./user"

export interface Comment {
  id: string
  body: string
  createdAt: Date
  updatedAt: Date
  userId: string
  postId: string

  user: User
  post: Post
}
