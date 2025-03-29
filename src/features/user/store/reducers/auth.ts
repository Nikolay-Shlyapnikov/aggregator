import { fetch } from '../../../../utils/request/API'
import { ADDRESS_URL } from '../../../../app/config'
import { userSlice } from '../userSlice'
import { AppDispatch } from '../../../../utils/store/store'
import { Credentials } from '../types'

export const authUser = (user: Credentials) => (dispatch: AppDispatch) => {
  fetch(
    'post',
    `${ADDRESS_URL}/auth`,
    {
      params: { ...user },
    },
    (response) => {
      if (response.data) {
        dispatch(
          userSlice.actions.setUser({
            ...response.data,
            token: response.headers.token,
          })
        )
      } else {
        console.error(response)
      }
    }
  )
}
