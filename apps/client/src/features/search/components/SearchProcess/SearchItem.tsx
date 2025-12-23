import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageWithLoader } from 'ui-lib-kit'

import { PHOTO_URL } from '../../../../app/config'
import Default from '../../../../assets/post/default.svg'
import { useAppDispatch } from '../../../../utils/hooks/reduxHooks'
import { postSlice } from '../../../post/store/store'
import { SearchPost } from '../../../post/store/types'
import styles from './SearchItem.module.less'

export type SearchItemProps = SearchPost

export const SearchItem: React.FC<SearchItemProps> = ({
	id,
	name,
	description,
	preview_id,
	liked,
}) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const handleClickPost = () => {
		dispatch(postSlice.actions.setPost({ id, name, description, preview_id, liked }))
		navigate(`/post/${id}`)
	}
	return (
		<div className={styles.searchItem} onClick={handleClickPost}>
			{preview_id === null ? (
				<Default />
			) : (
				<ImageWithLoader
					src={`${PHOTO_URL}/post?page_id=${preview_id}&post_id=${id}`}
					alt='Описание изображения'
					className={styles.searchPreview}
				/>
			)}
			<p>Идентификатор: {id}</p>
			<p>Название: {name}</p>
			<p>Описание: {description}</p>
		</div>
	)
}
