import React from 'react'

import { InSearch } from '../features/search/components/SearchProcess/InSearch'
import { UploadPost } from '../features/user/uploadPost/UploadPost'
import { Header } from '../features/header/Header'
import styles from '../app/styles/styles.scss'

export const MainPage = () => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <InSearch />
        <UploadPost />
      </main>
    </>
  )
}
