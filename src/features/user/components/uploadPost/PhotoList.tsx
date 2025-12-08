import React, { useEffect } from 'react'
import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	Droppable,
	DroppableProvided,
	DropResult,
} from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks/reduxHooks'
import { postSlice } from '../../../post/store/store'
import styles from './UploadPost.scss'
import { UploadPostPhoto } from '../../../post/store/types'

export const PhotoList = () => {
	const photos = useAppSelector((state) => state.post.uploadPost.photos)
	const dispatch = useAppDispatch()

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const newPhotos = [...photos]
		const [movedPhoto] = newPhotos.splice(result.source.index, 1)
		newPhotos.splice(result.destination.index, 0, movedPhoto)

		dispatch(postSlice.actions.setPost({ uploadPost: { photos: newPhotos } }))
	}

	const handleRemovePhoto = (photo: UploadPostPhoto) => {
		const newPhotos = [...photos]
		newPhotos.splice(photos.indexOf(photo), 1)
		console.log(newPhotos)
		dispatch(postSlice.actions.setPost({ uploadPost: { photos: newPhotos } }))
	}

	useEffect(() => {
		return () => {
			if (photos.length) {
				photos.forEach((photos) => {
					URL.revokeObjectURL(photos.fileUrl)
				})

				dispatch(postSlice.actions.setPost({ uploadPost: { photos: [] } }))
			}
		}
	}, [])

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId='photos'>
				{(provided: DroppableProvided) => (
					<div
						className={styles.photoList}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{photos.map((photo, index) => (
							<Draggable
								key={photo.fileName}
								draggableId={photo.fileName}
								index={index}
							>
								{(provided: DraggableProvided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className={styles.photo}
									>
										<span className={styles.photoNumber}>
											{index + 1}{' '}
											<span className={styles.photoName}>
												{photo.fileName}
											</span>
										</span>
										<img
											src={photo.fileUrl}
											alt={photo.fileName}
											style={{ maxWidth: '100%' }}
										/>
										<div
											onClick={() => {
												handleRemovePhoto(photo)
											}}
											className={styles.photoCross}
										></div>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}
