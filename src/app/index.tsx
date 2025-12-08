import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { MainPage } from '../pages/MainPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from '../utils/store/store'
import { LoginPage } from '../pages/LoginPage'
import { ProfilePage } from '../pages/ProfilePage'
import { PostPage } from '../pages/PostPage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/post/:id',
    element: <PostPage />,
  },
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
