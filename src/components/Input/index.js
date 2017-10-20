import React from 'react'

import cn from 'utils/cn'

import './input.css'

const Input = ({
  placeholder,
  value,
  type,
  required,
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className={cn(
        'input',
      )}
      />
  )
}

export default Input
