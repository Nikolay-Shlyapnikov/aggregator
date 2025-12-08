export type SearchPost = {
  id: string
  name: string
  description: string
  'created-at': string
  tags: string[]
  preview_id: string
}

export interface Post extends SearchPost {
  page_list: string[]
  created_at: string
  preview_src: string
  isLoading: boolean
}

export type PostSlice = Post
