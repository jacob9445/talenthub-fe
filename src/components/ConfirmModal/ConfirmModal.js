import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connectModal } from 'redux-modal'

const ConfirmModal = ({ show, handleHide, proceed, cancel, confirmation, options }) => {
  const handleProceed = useCallback(() => {
    handleHide()
    proceed && proceed()
  }, [handleHide, proceed])

  const handleCancel = useCallback(() => {
    handleHide()
    cancel && cancel()
  }, [handleHide, cancel])
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleHide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{confirmation}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            No
          </Button>
          <Button onClick={handleProceed} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default connectModal({ name: 'confirmModal', destroyOnHide: false })(ConfirmModal)
