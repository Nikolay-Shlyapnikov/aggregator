import React from 'react'
import { ImageWithLoader } from '../../../../ui-lib/ImageWithLoader/ui/ImageWithLoader'
import styles from './ProfileHeader.scss'
import { ColoredIcon } from '../../../../assets/ColoredIcon'
import AddPhoto from '../../../../assets/user/addPhoto.svg'

export const ProfileHeader = () => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.imageWrapper}>
        <ImageWithLoader
          src=""
          alt="картинка"
          onErrorIcon={<ColoredIcon icon={AddPhoto} color="#ff4656" />}
        />
      </div>
    </div>
  )
}
