import React from 'react'
import styles from './ColoredIcon.module.scss'
import clsx from 'clsx'

export type ColoredIconProps = {
	color: string
	icon: React.FC<React.SVGProps<SVGSVGElement>>
	className?: string
}

export const ColoredIcon: React.FC<ColoredIconProps> = ({ color, icon: Icon, className }) => {
	return (
		<div
			className={clsx(styles.wrapper, className)}
			style={{ '--custom-fill': color } as React.CSSProperties}
		>
			<Icon />
		</div>
	)
}
