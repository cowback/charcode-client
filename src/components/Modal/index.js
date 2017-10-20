import React from 'react'

import Input from 'components/Input'
import Panel from 'components/Panel'

import cn from 'utils/cn'

import './modal.css'

const Modal = ({
  isOpen,
  content
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
        <Panel column centenred>
          {content}
        </Panel>
      </div>
    </div>
  )
}

export default Modal
