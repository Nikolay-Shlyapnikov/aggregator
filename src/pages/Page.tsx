import React from 'react'
import { Header } from '../features/header/Header'
import styles from '../app/styles/styles.scss'

export type PageProps = {
  children?: React.ReactNode | React.ReactNode[]
}

export const Page: React.FC<PageProps> = ({ children }) => (
  <React.Fragment>
    <Header />
    <main className={styles.container}>{children}</main>
  </React.Fragment>
)
