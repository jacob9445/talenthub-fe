import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connectModal } from 'redux-modal'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import TransactionForm from 'components/TransactionForm'
import { approveFinancialRequest, getFinancialRequests } from 'store/modules/financialRequest'
import { formSubmit } from 'helpers/form'
import { PAYMENT_PLATFORM_TYPE } from 'config/constants'

const ApproveRequestModal = ({
  requestId,
  gross_amount,
  show,
  handleHide,
  approveFinancialRequest,
  getFinancialRequests
}) => {
  const initialValues = {
    gross_amount: gross_amount,
    net_amount: 0,
    payment_platform: PAYMENT_PLATFORM_TYPE.PAYPAL
  }

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        approveFinancialRequest,
        {
          data: values,
          id: requestId,
          success: () => {
            getFinancialRequests()
            handleHide()
          }
        },
        formActions
      )
    },
    [approveFinancialRequest, requestId, getFinancialRequests, handleHide]
  )

  return (
    <Dialog open={show} onClose={handleHide}>
      <DialogTitle id="form-dialog-title">Approve Request</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
          {props => <TransactionForm {...props} onClose={handleHide} />}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

const actions = {
  approveFinancialRequest,
  getFinancialRequests
}

export default compose(
  connectModal({ name: 'approveRequestModal', destroyOnHide: false }),
  connect(
    null,
    actions
  )
)(ApproveRequestModal)
