import React, { useEffect } from 'react'
import { Header } from '../features/header/Header'
import styles from '../app/styles/styles.scss'
import { authUser } from '../features/user/store/reducers/auth'
import { useAppDispatch } from '../utils/hooks/reduxHooks'
import { updateUser } from '../features/user/store/userSlice'
import clsx from 'clsx'

export type PageProps = {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

export const Page: React.FC<PageProps> = ({ children, className }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(updateUser({ token }))
      dispatch(authUser({ email: '', password: '' }))
    }
  }, [])

  return (
    <React.Fragment>
      <Header />
      <main className={clsx(styles.container, className)}>{children}</main>
    </React.Fragment>
  )
}
