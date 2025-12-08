import React from 'react'
import clsx from 'clsx'
import { Loader, LoaderProps } from '../../Loader/ui/Loader'

import styles from './Button.module.less'

export type ButtonProps = {
	onClick: () => void
	children: React.ReactNode
	className?: string
	isDisabled?: boolean
	isLoading?: boolean
	loaderProps?: LoaderProps
}

export const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	className,
	isDisabled,
	isLoading,
	loaderProps,
}) => {
	return (
		<button className={clsx(styles.button, className)} disabled={isDisabled} onClick={onClick}>
			{isLoading ? (
				<Loader
					className={clsx(styles.loader, loaderProps?.className)}
					size={loaderProps?.size ?? 15}
					thickness={loaderProps?.thickness}
				/>
			) : (
				children
			)}
		</button>
	)
}
