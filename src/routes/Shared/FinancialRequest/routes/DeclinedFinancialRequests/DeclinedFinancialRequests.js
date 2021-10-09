import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import Widget from 'components/Widget'
import FinancialRequestsTable from '../../components/FinancialRequestTable'
import Spinner from 'components/Spinner'
import {
  getFinancialRequests,
  financialRequestsSelector,
  financialRequestsLoadingSelector,
  cancelFinancialRequest
} from 'store/modules/financialRequest'
import { meSelector } from 'store/modules/auth'
import ApproveRequestModal from 'components/ApproveRequestModal'
import { ROLES, URL_PREFIXES, FINANCIALREQUEST_STATUS } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const DeclinedFinancialRequest = ({
  getFinancialRequests,
  financialRequests,
  isFinancialRequestsLoading,
  me,
  cancelFinancialRequest,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getFinancialRequests({
      me: me,
      params: {
        ...pagination,
        status: FINANCIALREQUEST_STATUS.DECLINED,
      }
    })
  }, [getFinancialRequests, me, pagination])

  const getDeclinedFinancialRequests = useCallback(() => {
    getFinancialRequests({
      me: me,
      params: {
        ...pagination,
        status: FINANCIALREQUEST_STATUS.DECLINED
      }
    })
  }, [getFinancialRequests, me, pagination])

  const handleCancel = useCallback(
    id => {
      cancelFinancialRequest({
        id,
        success: getDeclinedFinancialRequests
      })
    },
    [cancelFinancialRequest, getDeclinedFinancialRequests]
  )

  if (isFinancialRequestsLoading) return <Spinner />
  else
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Widget
              title="Declined Financial Requests"
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
  cancelFinancialRequest
}

const selector = createStructuredSelector({
  financialRequests: financialRequestsSelector,
  isFinancialRequestsLoading: financialRequestsLoadingSelector,
  me: meSelector
})

DeclinedFinancialRequest.propTypes = {
  getFinancialRequests: PropTypes.func.isRequired,
  financialRequests: ListDataType,
  isFinancialRequestsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  cancelFinancialRequest: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

export default compose(withPaginationInfo, withRouter, connect(selector, actions))(DeclinedFinancialRequest)
