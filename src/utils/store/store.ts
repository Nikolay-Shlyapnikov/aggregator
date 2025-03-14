import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../../features/user/userSlice'
import { searchSlice } from '../../features/search/store/searchSlice'

export const setupStore = () => {
  return configureStore({
    reducer: combineReducers({
      user: userSlice.reducer,
      search: searchSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: false, // Отключаем проверку на сериализуемость
      }),
    ],
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = setupStore()
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppState = ReturnType<AppStore['getState']>
