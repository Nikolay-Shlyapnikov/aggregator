import React from 'react'
import { SearchPost } from '../../../post/store/types'
import { PHOTO_URL } from '../../../../app/config'
import styles from './SearchItem.module.scss'
import Default from '../../../../assets/post/default.svg'

export type SearchItemProps = SearchPost

export const SearchItem: React.FC<SearchItemProps> = ({
  id,
  name,
  description,
  tags,
  preview_id,
}) => (
  <div className={styles.searchItem}>
    {preview_id === null ? (
      <Default />
    ) : (
      <img
        src={`${PHOTO_URL}/post?id=${preview_id}`}
        alt="Описание изображения"
        className={styles.searchPreview}
      />
    )}
    <p>Идентификатор: {id}</p>
    <p>Название: {name}</p>
    <p>Описание: {description}</p>
    <p>Теги: {JSON.stringify(tags)}</p>
  </div>
)
