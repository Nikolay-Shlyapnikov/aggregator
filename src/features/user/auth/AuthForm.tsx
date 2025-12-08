import React from 'react'
import styles from './AuthForm.module.scss'
import { fetch } from '../../../utils/request/API'
import { ADDRESS_URL } from '../../../app/config'
import { useAppDispatch } from '../../../utils/hooks/reduxHooks'
import { userSlice } from '../userSlice'

export const AuthForm = () => {
  const dispatch = useAppDispatch()
  const [authForm, setAuthForm] = React.useState<{
    email: string
    password: string
  }>({ email: '', password: '' })

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: 'email' | 'password'
  ) => {
    setAuthForm({ ...authForm, [key]: event.target.value })
  }

  const handleSubmit = () => {
    fetch(
      'post',
      `${ADDRESS_URL}/auth`,
      {
        params: { ...authForm },
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

  return (
    <div className={styles.form}>
      <input
        className={styles.formField}
        value={authForm.email}
        type="text"
        placeholder="Почта"
        onChange={(event) => {
          handleChangeInput(event, 'email')
        }}
      />
      <input
        className={styles.formField}
        value={authForm.password}
        type="password"
        placeholder="Пароль"
        onChange={(event) => {
          handleChangeInput(event, 'password')
        }}
      />
      <button onClick={handleSubmit} className={styles.formButton}>
        Войти
      </button>
    </div>
  )
}
