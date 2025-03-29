import { fetch } from '../../../../utils/request/API'
import { ADDRESS_URL } from '../../../../app/config'
import { userSlice } from '../userSlice'
import { AppDispatch } from '../../../../utils/store/store'

export const acceptCode = (code: number) => (dispatch: AppDispatch) => {
  fetch(
    'post',
    `${ADDRESS_URL}/accept`,
    {
      params: { code },
    },
    (response) => {
      if (response.status === 200) {
        dispatch(
          userSlice.actions.setUser({
            ...response.data,
            token: response.headers.token,
            isConfirmed: true,
          })
        )
      } else {
        console.error(response)
      }
    }
  )
}
