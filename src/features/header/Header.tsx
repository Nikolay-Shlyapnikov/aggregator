import React from 'react'
import styles from './Header.module.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { fetch } from '../../utils/request/API'
import { ADDRESS_URL } from '../../app/config'
import { Post } from '../post/store/types'
import { searchSlice } from '../search/store/searchSlice'
import clsx from 'clsx'
import { ColoredIcon } from '../../assets/ColoredIcon'
import SerachIcon from '../../assets/seach/searchIcon.svg'

export const Header = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)

  const handleSearch = () => {
    fetch(
      'post',
      `${ADDRESS_URL}/search`,
      {
        params: { limit: 10, offset: 0 },
        headers: {
          token,
        },
      },
      (response) => {
        if (response.data) {
          if (response.data && response.data.length > 0) {
            const posts = response.data as unknown as Post[]

            dispatch(searchSlice.actions.setSearch({ posts }))
          }
        } else {
          console.error(response)
        }
      }
    )
  }

  return (
    <div className={styles.header}>
      <div className={clsx(styles.container, styles.headerSearchWrapper)}>
        <input
          className={styles.headerSearchField}
          type="text"
          placeholder="Поиск"
        />
        <button className={styles.headerButton} onClick={handleSearch}>
          <ColoredIcon icon={SerachIcon} color="#ff4656" />{' '}
        </button>
      </div>
    </div>
  )
}
