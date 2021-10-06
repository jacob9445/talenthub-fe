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
  getFinancialRequests,
  financialRequestsSelector,
  financialRequestsLoadingSelector,
  cancelFinancialRequest,
  declineFinancialRequest,
  approveFinancialRequest
} from 'store/modules/financialRequest'
import { meSelector } from 'store/modules/auth'
import ApproveRequestModal from 'components/ApproveRequestModal'
import {
  FINANCIALREQUEST_TYPE,
  ROLES,
  FINANCIALREQUEST_STATUS,
  FINANCIALREQUEST_ORDERBY_KEYS,
  URL_PREFIXES
} from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const PendingFinancialRequest = ({
  getFinancialRequests,
  financialRequests,
  isFinancialRequestsLoading,
  me,
  match: { url },
  cancelFinancialRequest,
  declineFinancialRequest,
  show,
  approveFinancialRequest,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getFinancialRequests({
      me: me,
      params: {
        ...pagination,
        status: FINANCIALREQUEST_STATUS.PENDING,
        ordering: FINANCIALREQUEST_ORDERBY_KEYS.DESCENDING
      }
    })
  }, [getFinancialRequests, me, pagination])

  const getPendingFinancialRequests = useCallback(() => {
    getFinancialRequests({
      me: me,
      params: {
        ...pagination,
        status: FINANCIALREQUEST_STATUS.PENDING,
        ordering: FINANCIALREQUEST_ORDERBY_KEYS.DESCENDING
      }
    })
  }, [me, pagination, getFinancialRequests])

  const handleCancel = useCallback(
    id => {
      cancelFinancialRequest({
        id,
        success: getPendingFinancialRequests
      })
    },
    [cancelFinancialRequest, getPendingFinancialRequests]
  )

  const handleApprove = useCallback(
    (requestId, grossAmount, requestType) => {
      if (requestType === FINANCIALREQUEST_TYPE.SENDINVOICE) {
        approveFinancialRequest({
          id: requestId,
          success: getPendingFinancialRequests
        })
      } else {
        show('approveRequestModal', { requestId, grossAmount, requestType })
      }
    },
    [show, approveFinancialRequest, getPendingFinancialRequests]
  )

  const handleDecline = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to decline the request?',
        proceed: () => {
          declineFinancialRequest({
            id,
            success: getPendingFinancialRequests
          })
        }
      })
    },
    [show, declineFinancialRequest, getPendingFinancialRequests]
  )

  if (isFinancialRequestsLoading) return <Spinner />
  else
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget
              title="Pending Financial Requests"
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

PendingFinancialRequest.propTypes = {
  getFinancialRequests: PropTypes.func.isRequired,
  financialRequests: ListDataType,
  isFinancialRequestsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  cancelFinancialRequest: PropTypes.func.isRequired,
  declineFinancialRequest: PropTypes.func.isRequired,
  approveFinancialRequest: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

export default compose(withPaginationInfo, withRouter, connect(selector, actions))(PendingFinancialRequest)
