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
      params: { email: user.email, password: user.password },
    },
    (response) => {
      if (response.data) {
        localStorage.setItem('token', response.headers.token)
        dispatch(
          userSlice.actions.setUser({
            ...response.data,
            token: response.headers.token,
          })
        )
      } else {
        dispatch(
          userSlice.actions.updateUser({
            token: undefined,
          })
        )
        console.error(response)
      }
    },
    () => {
      dispatch(
        userSlice.actions.updateUser({
          token: undefined,
        })
      )
    }
  )
}
