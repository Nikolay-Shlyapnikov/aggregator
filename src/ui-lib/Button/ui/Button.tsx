import React from 'react'
import styles from './Button.scss'
import clsx from 'clsx'

export type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
  className?: string
  isDisabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  isDisabled,
}) => {
  return (
    <button
      className={clsx(styles.button, className)}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
