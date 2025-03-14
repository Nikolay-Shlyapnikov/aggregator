import React, { ChangeEvent, useEffect, useState } from 'react'
import { fetch } from '../../../utils/request/API'
import { ADDRESS_URL, PHOTO_URL } from '../../../app/config'
import { store } from '../../../utils/store/store'

export const UploadPost = () => {
  const [post, setPost] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  })
  const [files, setFiles] = useState<FileList | null>(null)
  const [id, setId] = useState<string>('')

  const handleFileChange = (value: FileList | undefined | null) => {
    if (value) {
      setFiles(value)
    }
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: 'name' | 'description'
  ) => {
    setPost({ ...post, [key]: event.target.value })
  }

  const handleSubmit = () => {
    if (files && post.name && post.description) {
      const { name, description } = post
      fetch(
        'post',
        `${ADDRESS_URL}/post`,
        {
          params: {
            name,
            description,
          },
          headers: {
            token: store.getState().user.token,
          },
        },
        (response) => {
          if (response.data) {
            setId(response.data.id)
          } else {
            console.error(response)
          }
        }
      )
    }
  }

  useEffect(() => {
    if (id && files) {
      const form = new FormData()
      form.set('id', id)
      Array.from(files).forEach((file, index) => form.set(`${index}`, file))
      fetch(
        'post',
        `${PHOTO_URL}/post`,
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
  }, [id])

  return (
    <React.Fragment>
      <input
        type="file"
        multiple={true}
        onChange={(event) => {
          handleFileChange(event.target.files)
        }}
      />
      <input
        type="text"
        onChange={(event) => handleInputChange(event, 'name')}
        placeholder="Введите название"
      />
      <input
        type="text"
        onChange={(event) => handleInputChange(event, 'description')}
        placeholder="Введите описание"
      />
      <button onClick={handleSubmit}>Отправить</button>
    </React.Fragment>
  )
}
