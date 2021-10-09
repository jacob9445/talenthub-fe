import React, { useEffect } from 'react'
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
  financialRequestsLoadingSelector
} from 'store/modules/financialRequest'
import { meSelector } from 'store/modules/auth'
import ApproveRequestModal from 'components/ApproveRequestModal'
import { ROLES, URL_PREFIXES, FINANCIALREQUEST_STATUS } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const CanceledFinancialRequest = ({
  getFinancialRequests,
  financialRequests,
  isFinancialRequestsLoading,
  me,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getFinancialRequests({
      me: me,
      params: {
        ...pagination,
        status: FINANCIALREQUEST_STATUS.CANCELED
      }
    })
  }, [getFinancialRequests, me, pagination])

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
  getFinancialRequests
}

const selector = createStructuredSelector({
  financialRequests: financialRequestsSelector,
  isFinancialRequestsLoading: financialRequestsLoadingSelector,
  me: meSelector
})

CanceledFinancialRequest.propTypes = {
  getFinancialRequests: PropTypes.func.isRequired,
  financialRequests: ListDataType,
  isFinancialRequestsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  pagination: PropTypes.object
}

export default compose(withPaginationInfo, withRouter, connect(selector, actions))(CanceledFinancialRequest)
