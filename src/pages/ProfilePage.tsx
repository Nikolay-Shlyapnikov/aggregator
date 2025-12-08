import React from 'react'
import { Page } from './Page'
import { UploadForm } from '../features/user/components/uploadPost/UploadForm'
import { PhotoList } from '../features/user/components/uploadPost/PhotoList'
import styles from '../features/user/components/uploadPost/UploadPost.scss'

export const ProfilePage = () => {
  return (
    <Page className={styles.photoWrapper}>
      <UploadForm />
      <PhotoList />
    </Page>
  )
}
