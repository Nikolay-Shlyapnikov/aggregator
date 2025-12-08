import React, { ChangeEvent, useState } from 'react'
import { RootState, store } from '../utils/store/store'
import { address } from '../app/config'
import { fetch } from '../utils/request/API'
import { useDispatch, useSelector } from 'react-redux'
import { searchSlice } from '../features/search/store/searchSlice'
import { Post } from '../features/post/store/types'

export const MainPage = () => {
  const [id, setId] = useState<string>('')
  const [files, setFiles] = useState<FileList | null>(null)
  const posts = useSelector<RootState>((state) => state.search.posts)
  const dispatch = useDispatch()

  const handleFileChange = (value: FileList | undefined | null) => {
    if (value) {
      setFiles(value)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }

  const handleSubmit = () => {
    if (files && id) {
      const form = new FormData()
      form.set('id', id)
      Array.from(files).forEach((file, index) => form.set(`${index}`, file))

      fetch(
        'post',
        `${address}/manga`,
        {
          params: form,
          headers: {
            token: store.getState().user.token,
          },
        },
        (response) => {
          if (response.data) {
            console.log({ response })
          } else {
            console.error(response)
          }
        }
      )
    }
  }

  const handleSearch = () => {
    fetch(
      'post',
      `${address}/search`,
      {
        params: { limit: 10, offset: 0 },
        headers: {
          token: store.getState().user.token,
        },
      },
      (response) => {
        if (response.data) {
          if (response.data && response.data.length > 0) {
            const data = response.data as unknown as Post[]
            dispatch(searchSlice.actions.setSearch({ posts: data }))
            console.log({ response })
          }
        } else {
          console.error(response)
        }
      }
    )
  }

  return (
    <>
      <div>
        <input
          type="file"
          multiple={true}
          onChange={(event) => {
            handleFileChange(event.target.files)
          }}
        />
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Введите id"
        />
        <button onClick={handleSubmit}>Отправить</button>
      </div>
      <div>
        <button onClick={handleSearch}>Получить</button>
      </div>
    </>
  )
}
