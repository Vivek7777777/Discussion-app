import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  _id: string
}

const initialState: UserState = {
    _id: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },

    resetUser: (state) => {
      state = initialState;
      return state;
    },
  },
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer