import type { CommentData, CommentReply, RequestBodyComment } from '@/types/comment'
import { $delete, $get, $patch, $post } from './axios'

export async function apitGetCommentByBlogId(id: string): Promise<CommentData[]> {
  return $get(`/blog/${id}/comments/`)
}

export async function apiCreateComment(id: string, data: RequestBodyComment): Promise<CommentData> {
  return $post(`/blog/${id}/comments/`, data)
}

export async function apiUpdateCommentById(id: string, data: RequestBodyComment): Promise<CommentData> {
  return $patch(`/blog/comments/${id}`, data)
}

export async function apiCreateReplyComment(id: string, data: CommentReply): Promise<CommentData> {
  return $post(`/blog/comments/${id}/reply`, data)
}
export async function apiDeleteCommentById(id: string): Promise<CommentData> {
  return $delete(`/blog/comments/${id}`, {})
}
