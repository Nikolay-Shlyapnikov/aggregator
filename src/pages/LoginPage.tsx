import React from 'react'
import { Page } from './Page'
import { AuthForm } from '../features/user/components/auth/AuthForm'

export const LoginPage = () => {
	return (
		<Page>
			<AuthForm />
		</Page>
	)
}
