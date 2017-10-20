import React from 'react'

import Panel from 'components/Panel'

import cn from 'utils/cn'

import './modal.css'

const Modal = ({
  isOpen,
  children
}) => {

  return !isOpen ? null : (
    <div
      className={cn(
        'modal',
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
  )
}

export default Modal
