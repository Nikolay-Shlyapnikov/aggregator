import clsx from 'clsx'
import React, { useEffect } from 'react'

import { SearchList } from '../features/search/components/SearchProcess/SearchList'
import { setSearch } from '../features/search/store/searchSlice'
import { ProfileHeader } from '../features/user/components/ProfileHeader/ProfileHeader'
import { PROFILE_MODES } from '../features/user/components/ProfileModes/const'
import { ProfileTabSet } from '../features/user/components/ProfileModes/ProfileTabset'
import { PhotoList } from '../features/user/components/uploadPost/PhotoList'
import { UploadForm } from '../features/user/components/uploadPost/UploadForm'
import styles from '../features/user/components/uploadPost/UploadPost.less'
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks'
import { Page } from './Page'

export const ProfilePage = () => {
	const profileMode = useAppSelector((state) => state.user.profileMode)
	const dispatch = useAppDispatch()

	console.log(profileMode)
	useEffect(() => {
		if (profileMode === PROFILE_MODES.LIKES) {
			dispatch(
				setSearch({
					posts: [],
					filters: {
						liked: true,
					},
				}),
			)
		}
	}, [profileMode, dispatch])

	return (
		<Page>
			<div className={clsx(styles.profileWrapper, styles.headerWrapper)}>
				<ProfileHeader />
				<ProfileTabSet />
			</div>
			{profileMode === PROFILE_MODES.UPLOAD_POST && (
				<React.Fragment>
					<h1 className={styles.profileWrapperTitle}>
						Здесь вы можете создать новую новость или добавить информацию
					</h1>
					<div className={clsx(styles.profileWrapper)}>
						<UploadForm />
						<PhotoList />
					</div>
				</React.Fragment>
			)}
			{profileMode === PROFILE_MODES.LIKES && (
				<React.Fragment>
					<h1 className={styles.profileWrapperTitle}>Понравившиеся Вам посты:</h1>
					<SearchList />
				</React.Fragment>
			)}
		</Page>
	)
}
