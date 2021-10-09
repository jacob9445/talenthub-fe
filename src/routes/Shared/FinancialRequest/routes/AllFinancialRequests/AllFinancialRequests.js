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
import { FINANCIALREQUEST_TYPE, ROLES, URL_PREFIXES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const AllFinancialRequest = ({
  getFinancialRequests,
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
    getFinancialRequests({
      me: me,
      params: { ...pagination }
    })
  }, [getFinancialRequests, me, pagination])

  const getAllFinancialRequests = useCallback(() => {
    getFinancialRequests({
      me: me,
      params: {
        ...pagination
      }
    })
  }, [me, pagination, getFinancialRequests])

  const handleCancel = useCallback(
    id => {
      cancelFinancialRequest({
        id,
        success: getAllFinancialRequests
      })
    },
    [cancelFinancialRequest, getAllFinancialRequests]
  )

  const handleApprove = useCallback(
    (requestId, grossAmount, requestType) => {
      if (requestType === FINANCIALREQUEST_TYPE.SENDINVOICE) {
        approveFinancialRequest({
          id: requestId,
          success: getAllFinancialRequests
        })
      } else {
        show('approveRequestModal', { requestId, grossAmount })
      }
    },
    [show, approveFinancialRequest, getAllFinancialRequests]
  )

  const handleDecline = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to decline the request?',
        proceed: () => {
          declineFinancialRequest({
            id,
            success: getAllFinancialRequests
          })
        }
      })
    },
    [show, declineFinancialRequest, getAllFinancialRequests]
  )

  if (isFinancialRequestsLoading) return <Spinner />
  else
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget
              title="All Financial Requests"
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

AllFinancialRequest.propTypes = {
  getFinancialRequests: PropTypes.func.isRequired,
  financialRequests: ListDataType,
  isFinancialRequestsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  cancelFinancialRequest: PropTypes.func.isRequired,
  declineFinancialRequest: PropTypes.func.isRequired,
  approveFinancialRequest: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

export default compose(withPaginationInfo, withRouter, connect(selector, actions))(AllFinancialRequest)
