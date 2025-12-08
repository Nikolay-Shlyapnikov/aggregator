import React, { useEffect, useState } from 'react'
import styles from './AuthForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks/reduxHooks'
import { authUser } from '../../store/reducers/auth'
import { signup } from '../../store/reducers/signup'
import { acceptCode } from '../../store/reducers/acceptCode'
import { Credentials } from '../../store/types'
import { shallowEqual } from 'react-redux'
import { ColoredIcon } from '../../../../assets/ColoredIcon'
import CheckMark from '../../../../assets/user/checkMark.svg'
import { useNavigate } from 'react-router-dom'

export const AuthForm = () => {
	const { token } = useAppSelector((state) => state.user, shallowEqual)
	const navigate = useNavigate()

	const [authForm, setAuthForm] = React.useState<
		Credentials & { passwordRepeat: string; code: string }
	>({
		email: '',
		password: '',
		passwordRepeat: '',
		code: '',
	})
	const dispatch = useAppDispatch()
	const [isAuth, setIsAuth] = useState(false)

	const handleChangeInput = (
		event: React.ChangeEvent<HTMLInputElement>,
		key: keyof typeof authForm,
	) => {
		setAuthForm({ ...authForm, [key]: event.target.value })
	}

	const handleSubmit = () => {
		const { passwordRepeat, ...rest } = authForm
		if (isAuth) {
			dispatch(authUser(rest))
		} else {
			if (passwordRepeat == rest.password) {
				dispatch(signup(rest))
			}
		}
	}

	const handleAcceptCode = () => {
		dispatch(acceptCode(Number(authForm.code)))
	}

	const isShowAcceptCode = !isAuth && !!token

	useEffect(() => {
		if (token) {
			navigate('/profile')
		}
	}, [token])

	return (
		<div className={styles.form}>
			<input
				className={styles.formField}
				value={authForm.email}
				type='text'
				placeholder='Почта'
				onChange={(event) => {
					handleChangeInput(event, 'email')
				}}
			/>
			<input
				className={styles.formField}
				value={authForm.password}
				type='password'
				placeholder='Пароль'
				onChange={(event) => {
					handleChangeInput(event, 'password')
				}}
			/>
			{!isAuth && (
				<input
					className={styles.formField}
					value={authForm.passwordRepeat}
					type='password'
					placeholder='Повторите пароль'
					onChange={(event) => {
						handleChangeInput(event, 'passwordRepeat')
					}}
				/>
			)}
			{isShowAcceptCode && (
				<div className={styles.checkMarkWrapper}>
					<input
						className={styles.formField}
						value={authForm.code}
						type='text'
						placeholder='Введите код'
						onChange={(event) => {
							handleChangeInput(event, 'code')
						}}
					/>
					<button onClick={handleAcceptCode} type='button' className={styles.checkMark}>
						<ColoredIcon color='#ff4656' icon={CheckMark} />
					</button>
				</div>
			)}
			<button onClick={handleSubmit} className={styles.formButton}>
				{isAuth ? 'Войти' : 'Зарегистрироваться'}
			</button>
			<p className={styles.formText}>
				{isAuth ? 'Еще нет аккаунта? ' : 'Уже есть аккаунт? '}
				<button
					onClick={() => setIsAuth((status) => !status)}
					className={styles.formTextButton}
				>
					{isAuth ? 'Зарегистрируйтесь!' : 'Войдите'}
				</button>
			</p>
		</div>
	)
}
