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
import { approveFinancialRequest, getFinancialRequests } from 'store/modules/financialRequest'
import { formSubmit } from 'helpers/form'
import { PAYMENT_PLATFORM_TYPE, FINANCIALREQUEST_STATUS } from 'config/constants'
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
  requestType,
  show,
  handleHide,
  approveFinancialRequest,
  getFinancialRequests,
  getPendingRequests,
  dashboard,
  pagination,
  me
}) => {
  const initialValues = {
    gross_amount: grossAmount,
    net_amount: grossAmount,
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
              getFinancialRequests({
                me: me,
                params: {
                  ...pagination,
                  status: FINANCIALREQUEST_STATUS.PENDING
                }
              })
            }
            handleHide()
          }
        },
        formActions
      )
    },
    [
      approveFinancialRequest,
      requestId,
      getFinancialRequests,
      handleHide,
      getPendingRequests,
      dashboard,
      me,
      pagination
    ]
  )

  return (
    <Dialog open={show} onClose={handleHide}>
      <DialogTitle id="form-dialog-title">Approve Request</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
          {props => <TransactionForm {...props} onClose={handleHide} requestType={requestType} />}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

const actions = {
  approveFinancialRequest,
  getFinancialRequests,
  getPendingRequests
}

ApproveRequestModal.defaultProps = {
  dashboard: false
}

ApproveRequestModal.propTypes = {
  approveFinancialRequest: PropTypes.func.isRequired,
  getFinancialRequests: PropTypes.func.isRequired,
  getPendingRequests: PropTypes.func.isRequired,
  requestId: PropTypes.number.isRequired,
  grossAmount: PropTypes.number.isRequired,
  dashboard: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  requestType: PropTypes.number.isRequired
}

export default compose(
  connectModal({ name: 'approveRequestModal', destroyOnHide: false }),
  connect(null, actions)
)(ApproveRequestModal)
