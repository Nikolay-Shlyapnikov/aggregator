import React, { useEffect } from 'react'
import { Header } from '../features/header/Header'
import styles from '../app/styles/styles.scss'
import { authUser } from '../features/user/store/reducers/auth'
import { useAppDispatch } from '../utils/hooks/reduxHooks'
import { updateUser } from '../features/user/store/userSlice'

export type PageProps = {
  children?: React.ReactNode | React.ReactNode[]
}

export const Page: React.FC<PageProps> = ({ children }) => {
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
      <main className={styles.container}>{children}</main>
    </React.Fragment>
  )
}
