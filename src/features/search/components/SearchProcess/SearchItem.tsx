import React from 'react'
import { SearchPost } from '../../../post/store/types'
import { PHOTO_URL } from '../../../../app/config'
import styles from './SearchItem.module.scss'
import Default from '../../../../assets/post/default.svg'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../utils/hooks/reduxHooks'
import { postSlice } from '../../../post/store/store'
import { ImageWithLoader } from '../../../../ui-lib/ImageWithLoader/ui/ImageWithLoader'

export type SearchItemProps = SearchPost

export const SearchItem: React.FC<SearchItemProps> = ({
  id,
  name,
  description,
  tags,
  preview_id,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleClickPost = () => {
    dispatch(postSlice.actions.setPost({ id, name, description, preview_id }))
    navigate(`/post/${id}`)
  }
  return (
    <div className={styles.searchItem} onClick={handleClickPost}>
      {preview_id === null ? (
        <Default />
      ) : (
        <ImageWithLoader
          src={`${PHOTO_URL}/post?page_id=${preview_id}&post_id=${id}`}
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
}
