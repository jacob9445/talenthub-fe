import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { show } from 'redux-modal'

import Widget from 'components/Widget'
import FinancialRequestsTable from '../../components/FinancialRequestTable'
import Spinner from 'components/Spinner'
import {
  getCanceledFinancialRequests,
  financialRequestsSelector,
  financialRequestsLoadingSelector,
  cancelFinancialRequest,
  declineFinancialRequest,
  approveFinancialRequest
} from 'store/modules/financialRequest'
import { meSelector } from 'store/modules/auth'
import ApproveRequestModal from 'components/ApproveRequestModal'
import { FINANCIALREQUEST_TYPE, ROLES, URL_PREFIXES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const CanceledFinancialRequest = ({
  getCanceledFinancialRequests,
  financialRequests,
  isFinancialRequestsLoading,
  me,
  cancelFinancialRequest,
  declineFinancialRequest,
  show,
  approveFinancialRequest,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getCanceledFinancialRequests({
      me: me,
      params: pagination
    })
  }, [getCanceledFinancialRequests, me, pagination])

  const handleCancel = useCallback(
    id => {
      cancelFinancialRequest({
        id,
        success: () => getCanceledFinancialRequests()
      })
    },
    [cancelFinancialRequest, getCanceledFinancialRequests]
  )

  const handleApprove = useCallback(
    (requestId, gross_amount, request_type) => {
      if (request_type === FINANCIALREQUEST_TYPE.SENDINVOICE) {
        approveFinancialRequest({
          id: requestId,
          success: () => getCanceledFinancialRequests()
        })
      } else {
        show('approveRequestModal', { requestId, gross_amount })
      }
    },
    [show, approveFinancialRequest, getCanceledFinancialRequests]
  )

  const handleDecline = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to decline the request?',
        proceed: () => {
          declineFinancialRequest({
            id,
            success: () => getCanceledFinancialRequests()
          })
        }
      })
    },
    [show, declineFinancialRequest, getCanceledFinancialRequests]
  )

  if (isFinancialRequestsLoading) return <Spinner />
  else
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget
              title="Canceled Financial Requests"
              disableWidgetMenu
              WidgetButton={
                [ROLES.DEVELOPER, ROLES.TEAM_MANAGER].includes(me.role) ? (
                  <Button color="primary" component={Link} to={`/${URL_PREFIXES[me.role]}/financial-requests/new`}>
                    Add a Financial Request
                  </Button>
                ) : (
                  undefined
                )
              }>
              <FinancialRequestsTable
                data={financialRequests}
                me={me}
                onCancel={handleCancel}
                onApprove={handleApprove}
                onDecline={handleDecline}
                pagination={pagination}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </Widget>
          </Grid>
        </Grid>
        <ApproveRequestModal />
      </>
    )
}

const actions = {
  getCanceledFinancialRequests,
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

CanceledFinancialRequest.propTypes = {
  getCanceledFinancialRequests: PropTypes.func.isRequired,
  financialRequests: ListDataType,
  isFinancialRequestsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  cancelFinancialRequest: PropTypes.func.isRequired,
  declineFinancialRequest: PropTypes.func.isRequired,
  approveFinancialRequest: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

export default compose(withPaginationInfo, withRouter, connect(selector, actions))(CanceledFinancialRequest)
