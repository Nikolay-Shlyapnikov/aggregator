import React from 'react'

import { InSearch } from '../features/search/components/SearchProcess/InSearch'
import { UploadPost } from '../features/user/uploadPost/UploadPost'
import { Page } from './Page'

export const MainPage = () => {
  return (
    <Page>
      <InSearch />
      <UploadPost />
    </Page>
  )
}
