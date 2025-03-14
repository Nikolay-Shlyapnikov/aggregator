import React from 'react'

import { InSearch } from '../features/search/components/SearchProcess/InSearch'
import { UploadPost } from '../features/user/uploadPost/UploadPost'

export const MainPage = () => {
  return (
    <>
      <div>
        <InSearch />
        <UploadPost />
      </div>
    </>
  )
}
