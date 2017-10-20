import React from 'react'
import { Link } from 'react-router-dom'

import cn from 'utils/cn'

import './button.css'

const Button = ({
  children,
  to,
  href,
  small,
  ghost,
  disabled,
  onClick,
}) => {
  const Tag = to ? Link
    : href ? 'a'
    : 'button'

  return (
    <Tag
      to={to}
      href={href}
      disabled={disabled}
      className={cn(
        'button',
        small && 'button--small',
        ghost && 'button--ghost',
      )}
      onClick={onClick}
      >
      {children}
    </Tag>
  )
}

export default Button
