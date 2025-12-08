import { AppDispatch } from '../../../../utils/store/store'
import { fetch } from '../../../../utils/request/API'
import { ADDRESS_URL } from '../../../../app/config'
import { postSlice } from '../store'

export const getPost = (id: string) => (dispatch: AppDispatch) => {
  dispatch(postSlice.actions.setPost({ isLoading: true }))
  fetch(
    'get',
    `${ADDRESS_URL}/posts`,
    {
      params: { id },
    },
    (response) => {
      dispatch(postSlice.actions.setPost(response.data))
      dispatch(postSlice.actions.setPost({ isLoading: false }))
    }
  )
}
