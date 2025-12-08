import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../../store/reducers/getPost'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks/reduxHooks'
import { Loader } from '../../../../ui-lib/Loader/ui/Loader'
import styles from './Post.scss'
import { PHOTO_URL } from '../../../../app/config'
import { ImageWithLoader } from '../../../../ui-lib/ImageWithLoader/ui/ImageWithLoader'
import { postSlice } from '../../../post/store/store'

export const Post = () => {
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const post = useAppSelector((state) => state.post)

	useEffect(() => {
		if (id) {
			dispatch(getPost(id))
		}
	}, [id])

	useEffect(() => {
		if (post.preview_id === '' && post.page_list[0]) {
			dispatch(postSlice.actions.setPost({ preview_id: post.page_list[0] }))
		}
	}, [post])

	return (
		<div className={styles.postWrapper}>
			<aside className={styles.aside}>
				<div className={styles.asidePreviewWrapper}>
					<ImageWithLoader
						src={`${PHOTO_URL}/post?page_id=${post.preview_id}&post=${id}`}
						className={styles.asidePreview}
						alt='Превью поста'
					/>
				</div>
				<div className={styles.asideMenu}>
					<div className={styles.postTitle}>Какое-то поле</div>
					<div className={styles.postTitle}>Какое-то поле</div>
					<div className={styles.postTitle}>Какое-то поле</div>
					<div className={styles.postTitle}>Какое-то поле</div>
					<div className={styles.postTitle}>Какое-то поле</div>
					<div className={styles.postTitle}>Какое-то поле</div>
					<div className={styles.postTitle}>Какое-то поле</div>
				</div>
			</aside>
			<div className={styles.post}>
				<h1 className={styles.postTitle}>
					Название: {!post.name && post.isLoading ? <Loader /> : post.name}
				</h1>
				<p className={styles.postDescription}>Описание: {post.description}</p>
				<div>
					{post.page_list.map((page: string, index: number) => (
						<ImageWithLoader
							key={page}
							src={`${PHOTO_URL}/post?page_id=${page}&post_id=${id}`}
							alt={`Фото потса №${index}`}
							size={150}
							thickness={5}
							className={styles.postImage}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
