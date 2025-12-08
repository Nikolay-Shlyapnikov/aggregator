import React from 'react'
import styles from './ColoredIcon.module.scss'

export type ColoredIconProps = {
  color: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export const ColoredIcon: React.FC<ColoredIconProps> = ({
  color,
  icon: Icon,
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{ '--custom-bg': color } as React.CSSProperties}
    >
      <Icon />
    </div>
  )
}
