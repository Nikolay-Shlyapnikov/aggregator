import React, { ChangeEvent, useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './textarea.scss'
import { v4 } from 'uuid'

export type TextareaProps = {
  value?: string
  /**  текст-подсказка внутри textarea*/
  placeholder?: string
  /**  функция по обработке момента изменения значения textarea, принимает 3 аргумента: текущее значение - value, старое значение -oldValue и name textarea*/
  onChange?(value: string, oldValue: string): void
  /** Функция по обработки момента потери фокуса, принимает 2 аргумента: текущее значение - value и старое значение -oldValue*/
  onExit?(value: string, oldValue: string): void
  /** Функция по обработке нажатия во время focus, принимает 3 аргумента: текущее значение - value, нажатую клавишу key и старое значение oldValue*/
  keyPress?(value: string, oldValue: string, key: string): void
  /** Содержит в себе стили разных состояний элемента*/
  classNames?: {
    /** Определяет стиль обёртки у textarea*/
    textareaWrapper?: string
    /** Определяет стиль текстового поля-описания у textarea*/
    title?: string
    /** Определяет стиль текстового поля-описания у textarea во время фокуса*/
    titleActive?: string
    /** Определяет общий стиль textarea*/
    textarea?: string
    /** Определяет стиль и вид пустого textarea*/
    empty?: string
  }
  /** Определяет, можно ли вводитиь значение в textarea*/
  isDisabled?: boolean
}

const id = v4()

export const Textarea: React.FC<TextareaProps> = ({
  value,
  isDisabled,
  onExit,
  keyPress,
  onChange,
  placeholder,
  classNames,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (value) setIsFocused(true)
    else {
      setIsFocused(false)
    }
  }, [])

  useEffect(() => {
    if (value) setIsFocused(true)
    else {
      setIsFocused(false)
    }
  }, [value])

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e.target.value, String(value))
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (keyPress) {
      keyPress(e.currentTarget.value, String(value) || '', e.key)
    }
  }

  const onExitHandler = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    if (onExit) {
      onExit(e.target.value, String(value) || '')
    }
    if (!value) {
      setIsFocused(false)
    }
  }
  const onFocusHandler = () => {
    if (!isDisabled) setIsFocused(true)
  }

  return (
    <div
      className={clsx(
        styles.textareaWrapper,
        !value && styles.empty,
        classNames?.textareaWrapper
      )}
    >
      <label
        className={clsx(
          styles.textareaTitle,
          isFocused && styles.textareaTitleActive,
          classNames?.title,
          isFocused && classNames?.titleActive
        )}
        htmlFor={id}
      >
        {placeholder}
      </label>
      <textarea
        id={id}
        className={clsx(
          styles.textarea,
          isFocused && styles.textareaFocus,
          classNames?.textarea
        )}
        value={value ?? ''}
        onKeyDown={(e) => keyDownHandler(e)}
        onChange={(e) => changeHandler(e)}
        onBlur={(e) => onExitHandler(e)}
        onFocus={onFocusHandler}
        readOnly={isDisabled}
      />
    </div>
  )
}
