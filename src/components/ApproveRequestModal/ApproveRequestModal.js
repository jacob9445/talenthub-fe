import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connectModal } from 'redux-modal'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

import TransactionForm from 'components/TransactionForm'
import { approveFinancialRequest, getAllFinancialRequests } from 'store/modules/financialRequest'
import { formSubmit } from 'helpers/form'
import { PAYMENT_PLATFORM_TYPE } from 'config/constants'
import { getPendingRequests } from 'store/modules/dashboard'

const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const ApproveRequestModal = ({
  requestId,
  grossAmount,
  show,
  handleHide,
  approveFinancialRequest,
  getAllFinancialRequests,
  getPendingRequests,
  dashboard
}) => {
  const initialValues = {
    gross_amount: grossAmount,
    net_amount: 0,
    created_at: formatDate(new Date()),
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
            if (dashboard) {
              getPendingRequests()
            } else {
              getAllFinancialRequests()
            }
            handleHide()
          }
        },
        formActions
      )
    },
    [approveFinancialRequest, requestId, getAllFinancialRequests, handleHide, getPendingRequests, dashboard]
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
  getAllFinancialRequests,
  getPendingRequests
}

ApproveRequestModal.defaultProps = {
  dashboard: false
}

ApproveRequestModal.propTypes = {
  approveFinancialRequest: PropTypes.func.isRequired,
  getAllFinancialRequests: PropTypes.func.isRequired,
  getPendingRequests: PropTypes.func.isRequired,
  requestId: PropTypes.number.isRequired,
  grossAmount: PropTypes.number.isRequired,
  dashboard: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired
}

export default compose(
  connectModal({ name: 'approveRequestModal', destroyOnHide: false }),
  connect(null, actions)
)(ApproveRequestModal)
