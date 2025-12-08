import React, {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'

import styles from './Tabs.scss'
import clsx from 'clsx'

interface Tab<T extends string> {
  key: T
  title: string
  count?: number
  resourceId?: string
}

type TabsProps<T extends string> = {
  /**
   * Активная вкладка для начального состояния
   */
  activeTab?: T
  /**
   * Класс для кастомизации активной вкладки
   */
  activeTabClassName?: string
  /**
   * Класс для кастомизации контейнера
   */
  containerClassName?: string
  /**
   * Действие при клике на вкладку
   */
  onClick: (tab: T) => void
  /**
   * Класс для кастомизации вкладки
   */
  tabClassName?: string
  /**
   * Набор вкладок
   */
  tabs: ReadonlyArray<Tab<T>> | Array<Tab<T>>
  /**
   * Тип табов
   */
  type?: 'button' | 'line'
}

/**
 * Компонент с вкладками навигации для переключения между разными панелями
 */
export const Tabs = <T extends string>({
  activeTab,
  activeTabClassName,
  containerClassName,
  onClick,
  tabClassName,
  tabs,
  type = 'button',
}: PropsWithChildren<TabsProps<T>>) => {
  const [currentTab, setCurrentTab] = useState<T>(activeTab || tabs[0].key)
  const [linePosition, setLinePosition] = useState(0)
  const [currentTabWith, setCurrentTabWith] = useState(20)

  const tabsRef = useRef<HTMLDivElement>(null)

  const handleClickTab = (tab: T) => {
    setCurrentTab(tab)
    onClick(tab)
  }

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab)
    }
  }, [activeTab])

  useEffect(() => {
    if (type === 'line' && tabsRef.current?.childNodes.length) {
      const initialTabIndex = tabs.findIndex((tab) => tab.key === currentTab)

      const initialTab = tabsRef.current.childNodes[initialTabIndex]

      if (initialTab instanceof HTMLElement) {
        setLinePosition(initialTab.offsetLeft)
        setCurrentTabWith(initialTab.offsetWidth)
      }
    }
  }, [type, tabs, currentTab])

  return (
    <div className={clsx(styles.tabs, containerClassName)} ref={tabsRef}>
      {tabs.map((tab) => {
        const isActiveTab = tab.key === currentTab

        return (
          <button
            className={clsx(
              styles.tabsItem,
              isActiveTab && styles.tabsItemActive,
              isActiveTab && activeTabClassName,
              tabClassName
            )}
            key={tab.key}
            onClick={() => handleClickTab(tab.key)}
            style={
              {
                '--width': `${100 / tabs.length}%`,
              } as CSSProperties
            }
            title={tab.title}
          >
            <span className={styles.tabsItemText}>{tab.title}</span>
            {typeof tab.count === 'number' && (
              <span
                className={clsx(
                  styles.tabsItemCount,
                  isActiveTab && styles.tabsItemCount__active
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
      {type === 'line' && (
        <div
          className={styles.line}
          style={
            {
              '--left': `${linePosition}px`,
              '--width': `${currentTabWith}px`,
            } as CSSProperties
          }
        />
      )}
    </div>
  )
}
