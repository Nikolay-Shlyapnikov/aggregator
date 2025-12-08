import React, { useEffect } from 'react'

import { SearchList } from '../features/search/components/SearchProcess/SearchList'
import { Page } from './Page'
import { setSearch } from '../features/search/store/searchSlice'
import { useAppDispatch } from '../utils/hooks/reduxHooks'

export const MainPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      setSearch({
        posts: [],
        filters: {
          liked: false,
        },
      })
    )
  }, [dispatch])

  return (
    <Page>
      <SearchList />
    </Page>
  )
}
