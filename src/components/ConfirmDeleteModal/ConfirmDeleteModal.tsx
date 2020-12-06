import React, { ReactElement } from 'react'
import { Dialog } from 'evergreen-ui'


export interface ConfirmDeleteModalProps {
  open: boolean,
  title: string | ReactElement,
  confirmText: string,
  loading?: boolean,
  confirmDisabled?: boolean,
  onClose: () => void,
  onConfirm: () => void,
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  title,
  confirmText,
  onConfirm,
  onClose,
  children,
  loading,
  confirmDisabled,
}) => {

  return (
    <Dialog
      isShown={open}
      title={title as any}
      onCloseComplete={onClose}
      confirmLabel={confirmText}
      onConfirm={onConfirm}
      isConfirmLoading={loading}
      isConfirmDisabled={confirmDisabled}
    >
      {children}
    </Dialog>
  )
}

export default ConfirmDeleteModal