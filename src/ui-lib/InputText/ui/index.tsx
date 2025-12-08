import React, { ChangeEvent, useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './InputTextStyle.scss'
import { v4 } from 'uuid'

export type InputFileProps = {
  value?: string
  /**  текст-подсказка внутри input*/
  placeholder?: string
  /**  функция по обработке момента изменения значения input, принимает 3 аргумента: текущее значение - value, старое значение -oldValue и name input*/
  onChange?(value: string, oldValue: string): void
  /** Функция по обработки момента потери фокуса, принимает 2 аргумента: текущее значение - value и старое значение -oldValue*/
  onExit?(value: string, oldValue: string): void
  /** Функция по обработке нажатия во время focus, принимает 3 аргумента: текущее значение - value, нажатую клавишу key и старое значение oldValue*/
  keyPress?(value: string, oldValue: string, key: string): void
  /** Содержит в себе стили разных состояний элемента*/
  classNames?: {
    /** Определяет стиль обёртки у input*/
    inputWrapper?: string
    /** Определяет стиль текстового поля-описания у input*/
    title?: string
    /** Определяет стиль текстового поля-описания у input во время фокуса*/
    titleActive?: string
    /** Определяет общий стиль input*/
    input?: string
    /** Определяет стиль и вид пустого input*/
    empty?: string
  }
  /** Определяет type у input, если true, то type будет password, по умолчанию false (type='text')*/
  isPassword?: boolean
  /** Определяет, можно ли вводитиь значение в input*/
  isDisabled?: boolean
}

const id = v4()

export const InputText: React.FC<InputFileProps> = ({
  value,
  isDisabled,
  isPassword,
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

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value, String(value))
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyPress) {
      keyPress(e.currentTarget.value, String(value) || '', e.key)
    }
  }

  const onExitHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
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
        styles.inputWrapper,
        !value && styles.empty,
        classNames?.inputWrapper
      )}
    >
      <label
        className={clsx(
          styles.inputTitle,
          isFocused && styles.inputTitleActive,
          classNames?.title,
          isFocused && classNames?.titleActive
        )}
        htmlFor={id}
      >
        {placeholder}
      </label>
      <input
        type={isPassword ? 'password' : 'text'}
        id={id}
        className={clsx(
          styles.input,
          isFocused && styles.inputFocus,
          classNames?.input
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
