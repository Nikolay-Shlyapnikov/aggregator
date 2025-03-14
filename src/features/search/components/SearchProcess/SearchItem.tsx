import React from 'react'
import { SearchPost } from '../../../post/store/types'
import { PHOTO_URL } from '../../../../app/config'

export type SearchItemProps = SearchPost

export const SearchItem: React.FC<SearchItemProps> = ({
  id,
  name,
  description,
  tags,
  preview_id,
}) => (
  <div>
    <p>Идентификатор: {id}</p>
    <p>Название: {name}</p>
    <p>Описание: {description}</p>
    <p>Теги: {JSON.stringify(tags)}</p>

    <img src={`${PHOTO_URL}/post?id=${preview_id}`} alt="Превью" />
  </div>
)
