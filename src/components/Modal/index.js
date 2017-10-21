import React from 'react'

import Panel from 'components/Panel'

import cn from 'utils/cn'
import media from 'utils/media'

import './modal.css'

const Modal = ({
  isOpen,
  onClick,
  children
}) => isOpen ? (
  <div
    onClick={onClick}
    className={cn(
      'modal',
      media.lessThan.tabletLandscape() && 'modal--cover'
    )}
  >
    <div
      className={cn(
        'modal__card',
      )}
    >
      {children}
    </div>
  </div>
) : null

export default Modal
