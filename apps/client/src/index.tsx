import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage'
import { MainPage } from './pages/MainPage'
import { ProfilePage } from './pages/ProfilePage'
import { store } from './utils/store/store'

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
])

root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
)
