import clsx from 'clsx'
import React, { CSSProperties } from 'react'

import styles from './Loader.module.less'

export type LoaderProps = {
	className?: string
	size?: number
	thickness?: number
}

export const Loader: React.FC<LoaderProps> = ({ className, thickness = 3, size = 24 }) => {
	return (
		<div
			className={clsx(styles.loader, className)}
			style={
				{
					'--size': `${size}px`,
					'--trickness': `${thickness}px`,
				} as CSSProperties
			}
		></div>
	)
}
