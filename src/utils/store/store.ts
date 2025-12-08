import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../../features/user/userSlice'
import { searchSlice } from '../../features/search/store/searchSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search: searchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку на сериализуемость
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
