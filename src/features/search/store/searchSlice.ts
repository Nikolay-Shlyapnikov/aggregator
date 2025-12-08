import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchSlice } from './types'

const initialState: SearchSlice = {
	posts: [],
	filters: {
		liked: false,
	},
}

export const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<Partial<SearchSlice>>) => {
			return { ...state, ...action.payload }
		},
	},
})

export const { setSearch } = searchSlice.actions
export default searchSlice.reducer
