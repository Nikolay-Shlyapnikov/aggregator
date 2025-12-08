import React from 'react'
import { Page } from './Page'
import { UploadPost } from '../features/user/uploadPost/UploadPost'

export const ProfilePage = () => {
  return (
    <Page>
      <UploadPost />
    </Page>
  )
}
