import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ROLE, User } from './types'

const initialState: User = {
  token: '',
  role: ROLE.GUEST,
  email: '',
  isConfirmed: false,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload }
    },
    deleteUser: () => {
      return initialState
    },
  },
})

export const { setUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer
