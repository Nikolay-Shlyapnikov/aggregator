import React from 'react'
import { Tabs } from '../../../../ui-lib/Tabs/ui/Tabs'
import { PROFILE_MODES } from './const'
import { useAppDispatch } from '../../../../utils/hooks/reduxHooks'
import { userSlice } from '../../store/userSlice'

export const ProfileTabSet = () => {
	const dispatch = useAppDispatch()

	return (
		<Tabs<PROFILE_MODES>
			tabs={[
				{ title: 'Загрузка', key: PROFILE_MODES.UPLOAD_POST },
				{ title: 'Понравившееся', key: PROFILE_MODES.LIKES },
			]}
			type={'line'}
			onClick={(tab) => {
				dispatch(userSlice.actions.updateUser({ profileMode: tab }))
			}}
		/>
	)
}
