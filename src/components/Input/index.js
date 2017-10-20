import React from 'react'

import cn from 'utils/cn'

import './input.css'

const Input = ({
  placeholder,
  value,
  type,
  name,
  required,
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
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
