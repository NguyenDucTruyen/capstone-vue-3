import type { BlogData, RequestCreateBlog, ResponseBlogData } from '@/types'
import { $get, $post } from './axios'

export async function apiGetBlogs(config: any): Promise<ResponseBlogData> {
  return $get('/blogs', config)
}
export async function apiCreateBlog(data: RequestCreateBlog): Promise<ResponseBlogData> {
  return $post('/blogs', data)
}

export async function apiGetBlogById(id: string): Promise<BlogData> {
  return $get(`/blogs/${id}`)
}
export async function apiGetNewBlogs(config: any): Promise<ResponseBlogData> {
  return $get('/blogs/newest', config)
}
export async function apiGetPopularBlogs(config: any): Promise<ResponseBlogData> {
  return $get('/blogs/popular', config)
}
// Fake data:
/**
 * [
  {
    _id: '67386f4ea043952e1d4fe77d',
    userId: {
      _id: '673819b4bb05acc9b0f8e466',
      firstName: 'John',
      lastName: 'Doe',
      email: 'mrtruyenbd1407@gmail.com',
      isActive: 'active',
      roleName: 'USER',
      createdAt: '2024-11-16T04:04:04.400Z',
      updatedAt: '2024-11-16T05:39:39.992Z',
    },
    category: {
      _id: '6738185ab4f1fe594f363623',
      name: 'Technology',
      status: 'active',
      slug: 'technology',
      createdAt: '2024-11-16T03:58:18.823Z',
      updatedAt: '2024-11-16T03:58:18.823Z',
    },
    title: 'Hehehehehe',
    content: '<p>Oke hehe</p>',
    blogImage: [],
    status: 'approved',
    reactionCount: 0,
    deleted: false,
    reaction: [],
    createdAt: '2024-11-16T10:09:18.866Z',
    updatedAt: '2024-11-16T10:10:23.547Z',
  },
  {
    _id: '67386f4ea043952e1d4fe77e',
    userId: {
      _id: '673819b4bb05acc9b0f8e467',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'janesmith@example.com',
      isActive: 'active',
      roleName: 'USER',
      createdAt: '2024-11-15T12:00:00.000Z',
      updatedAt: '2024-11-15T14:00:00.000Z',
    },
    category: {
      _id: '6738185ab4f1fe594f363624',
      name: 'Health',
      status: 'active',
      slug: 'health',
      createdAt: '2024-11-15T11:30:00.000Z',
      updatedAt: '2024-11-15T11:30:00.000Z',
    },
    title: 'The Benefits of Morning Exercise',
    content: '<p>Starting your day with exercise boosts your energy.</p>',
    blogImage: [],
    status: 'approved',
    reactionCount: 10,
    deleted: false,
    reaction: [],
    createdAt: '2024-11-16T08:00:00.000Z',
    updatedAt: '2024-11-16T09:00:00.000Z',
  },
  {
    _id: '67386f4ea043952e1d4fe77f',
    userId: {
      _id: '673819b4bb05acc9b0f8e468',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alicej@example.com',
      isActive: 'active',
      roleName: 'USER',
      createdAt: '2024-11-14T18:30:00.000Z',
      updatedAt: '2024-11-14T19:30:00.000Z',
    },
    category: {
      _id: '6738185ab4f1fe594f363625',
      name: 'Lifestyle',
      status: 'active',
      slug: 'lifestyle',
      createdAt: '2024-11-14T10:00:00.000Z',
      updatedAt: '2024-11-14T10:00:00.000Z',
    },
    title: 'Minimalist Living Tips',
    content: '<p>Learn how to embrace a simpler lifestyle.</p>',
    blogImage: [],
    status: 'approved',
    reactionCount: 20,
    deleted: false,
    reaction: [],
    createdAt: '2024-11-16T07:00:00.000Z',
    updatedAt: '2024-11-16T08:00:00.000Z',
  },
  {
    _id: '67386f4ea043952e1d4fe780',
    userId: {
      _id: '673819b4bb05acc9b0f8e469',
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bobbrown@example.com',
      isActive: 'active',
      roleName: 'USER',
      createdAt: '2024-11-13T08:15:00.000Z',
      updatedAt: '2024-11-13T09:15:00.000Z',
    },
    category: {
      _id: '6738185ab4f1fe594f363626',
      name: 'Food',
      status: 'active',
      slug: 'food',
      createdAt: '2024-11-13T07:00:00.000Z',
      updatedAt: '2024-11-13T07:00:00.000Z',
    },
    title: 'Top 5 Vegan Recipes',
    content: '<p>Discover delicious and easy vegan recipes.</p>',
    blogImage: [],
    status: 'approved',
    reactionCount: 15,
    deleted: false,
    reaction: [],
    createdAt: '2024-11-16T06:00:00.000Z',
    updatedAt: '2024-11-16T07:00:00.000Z',
  },
  {
    _id: '67386f4ea043952e1d4fe781',
    userId: {
      _id: '673819b4bb05acc9b0f8e470',
      firstName: 'Charlie',
      lastName: 'Wilson',
      email: 'charliewilson@example.com',
      isActive: 'active',
      roleName: 'USER',
      createdAt: '2024-11-12T10:00:00.000Z',
      updatedAt: '2024-11-12T11:00:00.000Z',
    },
    category: {
      _id: '6738185ab4f1fe594f363627',
      name: 'Travel',
      status: 'active',
      slug: 'travel',
      createdAt: '2024-11-12T09:00:00.000Z',
      updatedAt: '2024-11-12T09:00:00.000Z',
    },
    title: 'Top Destinations for 2025',
    content: '<p>Plan your next adventure with these amazing spots.</p>',
    blogImage: [],
    status: 'approved',
    reactionCount: 25,
    deleted: false,
    reaction: [],
    createdAt: '2024-11-16T05:00:00.000Z',
    updatedAt: '2024-11-16T06:00:00.000Z',
  },
]
 */
