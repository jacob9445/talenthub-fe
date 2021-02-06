import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { show } from 'redux-modal'

import Widget from 'components/Widget'
import FinancialRequestsTable from './FinancialRequestTable'
import Spinner from 'components/Spinner'
import {
  getFinancialRequests,
  financialRequestsSelector,
  financialRequestsLoadingSelector,
  cancelFinancialRequest,
  declineFinancialRequest,
  approveFinancialRequest
} from 'store/modules/financialRequest'
import { meSelector } from 'store/modules/auth'
import ApproveRequestModal from 'components/ApproveRequestModal'
import { FINANCIALREQUEST_TYPE } from 'config/constants'

const FinancialRequest = ({
  getFinancialRequests,
  financialRequests,
  isFinancialRequestsLoading,
  me,
  match: { path },
  cancelFinancialRequest,
  declineFinancialRequest,
  show,
  approveFinancialRequest
}) => {
  useEffect(() => {
    getFinancialRequests(me)
  }, [getFinancialRequests, me])

  const handleCancel = useCallback(
    id => {
      cancelFinancialRequest({
        id,
        success: () => getFinancialRequests()
      })
    },
    [cancelFinancialRequest, getFinancialRequests]
  )

  const handleApprove = useCallback(
    (requestId, gross_amount, request_type) => {
      if (request_type === FINANCIALREQUEST_TYPE.SENDINVOICE) {
        approveFinancialRequest({
          id: requestId,
          success: () => getFinancialRequests()
        })
      } else {
        show('approveRequestModal', { requestId, gross_amount })
      }
    },
    [show, approveFinancialRequest, getFinancialRequests]
  )

  const handleDecline = useCallback(
    id => {
      declineFinancialRequest({
        id,
        success: () => getFinancialRequests()
      })
    },
    [declineFinancialRequest, getFinancialRequests]
  )

  if (isFinancialRequestsLoading) return <Spinner />
  else
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget
              title="Financial Requests"
              disableWidgetMenu
              WidgetButton={
                <Button color="primary" component={Link} to={`${path}/new`}>
                  Add FinancialRequest
                </Button>
              }>
              <FinancialRequestsTable
                data={financialRequests}
                me={me}
                onCancel={handleCancel}
                onApprove={handleApprove}
                onDecline={handleDecline}
              />
            </Widget>
          </Grid>
        </Grid>
        <ApproveRequestModal />
      </>
    )
}

const actions = {
  getFinancialRequests,
  cancelFinancialRequest,
  declineFinancialRequest,
  approveFinancialRequest,
  show
}

const selector = createStructuredSelector({
  financialRequests: financialRequestsSelector,
  isFinancialRequestsLoading: financialRequestsLoadingSelector,
  me: meSelector
})

FinancialRequest.propTypes = {
  getFinancialRequests: PropTypes.func.isRequired,
  financialRequests: PropTypes.array,
  isFinancialRequestsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  cancelFinancialRequest: PropTypes.func.isRequired,
  declineFinancialRequest: PropTypes.func.isRequired,
  approveFinancialRequest: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(FinancialRequest)
