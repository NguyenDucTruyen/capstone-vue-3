export interface CommentReply {
  userId: {
    _id: string
  }
  content: string
  _id: string
}
export interface RequestBodyComment {
  content: string
}
export interface CommentData {
  _id: string
  userId: {
    _id: string
  }
  blogId: string
  content: string
  deleted: boolean
  reply: CommentReply[]
  createdAt: string
  updatedAt: string
}
