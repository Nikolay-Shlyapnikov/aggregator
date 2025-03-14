import React from 'react'
import { useAppSelector } from '../../../../utils/hooks/reduxHooks'
import { SearchItem } from './SearchItem'
import { SearchPost } from '../../../post/store/types'

export const SearchList = () => {
  const posts = useAppSelector((state) => state.search.posts)

  return (
    <div>
      {posts.map(
        ({
          id,
          name,
          description,
          tags,
          preview_id,
          'created-at': createdAt,
        }: SearchPost) => {
          return (
            <SearchItem
              key={id}
              id={id}
              name={name}
              description={description}
              tags={tags}
              preview_id={preview_id}
              created-at={createdAt}
            />
          )
        }
      )}
    </div>
  )
}
