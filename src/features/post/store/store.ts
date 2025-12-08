import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostSlice } from './types'

const initialState: PostSlice = {
  id: '1',
  name: 'Статья',
  description: 'Очень научная статья',
  page_list: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  created_at: new Date().toISOString(),
  preview_src: '',
  'created-at': '',
  tags: ['Научая деятельность'],
  preview_id: '1',
  isLoading: false,
}

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Partial<PostSlice>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setPost } = postSlice.actions
export default postSlice.reducer
