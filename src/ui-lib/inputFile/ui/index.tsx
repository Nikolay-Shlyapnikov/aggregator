import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'
import styles from './inputFile.scss'
import { v4 } from 'uuid'

export type InputFileProps = {
  classNames?: {
    input?: string
    label?: string
    inputWrapper?: string
    inputActive?: string
  }
  children?: ReactNode
  value?: FileList | null | undefined
  onChangeInput?(files: FileList | null | undefined): void
}

const id = v4()

export const InputFile: React.FC<InputFileProps> = ({
  classNames,
  value,
  onChangeInput,
  children,
}) => {
  const [isDrag, setIsDrag] = useState(false)

  return (
    <div className={clsx(styles.inputFile__wrapper, classNames?.inputWrapper)}>
      <input
        type="file"
        id={'file_' + id}
        multiple={true}
        draggable={true}
        className={clsx(styles.inputFile, classNames?.input)}
        onDragStart={(e) => {
          e.preventDefault()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDrag(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDrag(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setIsDrag(false)
            if (onChangeInput) {
              onChangeInput(e.dataTransfer.files)
            }
          }
        }}
        onChange={(e) => {
          if (onChangeInput) {
            onChangeInput(e.target.files)
          }
        }}
      />
      <label
        htmlFor={'file_' + id}
        className={clsx(
          styles.inputFile__label,
          isDrag && styles['inputFile__label--active'],
          classNames?.label,
          classNames?.inputActive
        )}
      >
        {children &&
          React.Children.toArray(children).map((child, index) => (
            <React.Fragment key={'childWrapperFile' + id + index}>
              {child}
            </React.Fragment>
          ))}
        {!children &&
          (value == undefined ? (
            isDrag ? (
              <div>Отпустите файлы, чтоб загрузить их</div>
            ) : (
              <div>Перетащите файлы, чтоб загрузить их</div>
            )
          ) : (
            Array.from(value).map((file, index) => {
              return (
                <div style={{ padding: '10px 0' }} key={'fileName' + index}>
                  Имя выбранного файла: {file.name}
                </div>
              )
            })
          ))}
      </label>
    </div>
  )
}
