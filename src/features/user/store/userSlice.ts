import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ROLE, User } from './types'
import { PROFILE_MODES } from '../components/ProfileModes/const'

const initialState: User = {
  token: '',
  role: ROLE.GUEST,
  profileMode: PROFILE_MODES.UPLOAD_POST,
  email: '',
  isConfirmed: false,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload }
    },
    deleteUser: () => {
      return initialState
    },
  },
})

export const { updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer
