import React from 'react'
import styles from './Button.scss'
import clsx from 'clsx'

export type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  )
}
