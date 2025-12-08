import React from 'react'
import { Page } from './Page'
import { AuthForm } from '../features/user/auth/AuthForm'

export const LoginPage = () => {
  return (
    <Page>
      <AuthForm />
    </Page>
  )
}
