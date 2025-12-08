import React, { useEffect } from 'react'

import { ADDRESS_URL } from '../../../../app/config'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks/reduxHooks'
import { fetch } from '../../../../utils/request/API'
import { Post, SearchPost } from '../../../post/store/types'
import { searchSlice } from '../../store/searchSlice'
import { SearchItem } from './SearchItem'
import styles from './SearchItem.module.less'

export const SearchList = () => {
	const posts = useAppSelector((state) => state.search.posts)
	const dispatch = useAppDispatch()
	const token = useAppSelector((state) => state.user.token)
	const filters = useAppSelector((state) => state.search.filters)
	console.log(filters)
	useEffect(() => {
		if (posts.length === 0) {
			fetch(
				'post',
				`${ADDRESS_URL}/search`,
				{
					params: { limit: 15, offset: 0, liked: filters.liked },
					headers: {
						token,
					},
				},
				(response) => {
					if (response.data) {
						if (response.data && response.data.length > 0) {
							const posts = response.data as unknown as Post[]

							dispatch(searchSlice.actions.setSearch({ posts }))
						}
					} else {
						console.error(response)
					}
				},
			)
		}
	}, [filters])
	return (
		<div className={styles.searchList}>
			{posts.map(({ id, name, description, preview_id, liked }: SearchPost) => {
				return (
					<SearchItem
						key={id}
						id={id}
						name={name}
						description={description}
						preview_id={preview_id}
						liked={liked}
						created-at=''
						tags={[]}
					/>
				)
			})}
		</div>
	)
}
