import React, { useEffect, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { show } from 'redux-modal'

import useStyles from './styles'
import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import WeeklyIncomeLineChart from 'components/WeeklyIncomeLineChart'
import {
  getOngoingProjects,
  getWeeklyIncome,
  getStats,
  getPendingRequests,
  getApprovedRequests,
  ongoingProjectsSelector,
  weeklyIncomeSelector,
  statsSelector,
  pendingRequestsSelector,
  approvedRequestsSelector,
  ongoingProjectsLoadingSelector,
  weeklyIncomeLoadingSelector,
  statsLoadingSelector,
  pendingRequestsLoadingSelector,
  approvedRequestsLoadingSelector
} from 'store/modules/dashboard'
import ProjectTable from 'routes/Project/ProjectTable'
import FinancialRequestTable from 'routes/FinancialRequest/components/FinancialRequestTable'
import { meSelector } from 'store/modules/auth'
import {
  cancelFinancialRequest,
  declineFinancialRequest,
  approveFinancialRequest
} from 'store/modules/financialRequest'
import ApproveRequestModal from 'components/ApproveRequestModal'
import { FINANCIALREQUEST_TYPE } from 'config/constants'
import StatCard from 'components/StatCard'

const Dashboard = ({
  getOngoingProjects,
  getWeeklyIncome,
  getStats,
  getPendingRequests,
  getApprovedRequests,
  ongoingProjects,
  weeklyIncome,
  stats,
  pendingFinancialRequests,
  approvedFinancialRequests,
  me,
  cancelFinancialRequest,
  declineFinancialRequest,
  show,
  approveFinancialRequest,
  ongoingProjectsIsLoading,
  weeklyIncomeIsLoading,
  statsIsLoading,
  pendingRequestsIsLoading,
  approvedRequestsIsLoading
}) => {
  const classes = useStyles()

  useEffect(() => {
    getOngoingProjects()
  }, [getOngoingProjects])

  useEffect(() => {
    getWeeklyIncome()
  }, [getWeeklyIncome])

  useEffect(() => {
    getStats()
  }, [getStats])

  useEffect(() => {
    getPendingRequests()
  }, [getPendingRequests])

  useEffect(() => {
    getApprovedRequests()
  }, [getApprovedRequests])

  const projectsData = useMemo(() => ({ results: ongoingProjects }), [ongoingProjects])
  const financialRequestsData = useMemo(() => ({ results: pendingFinancialRequests }), [pendingFinancialRequests])

  const handleCancel = useCallback(
    id => {
      cancelFinancialRequest({
        id,
        success: () => getPendingRequests()
      })
    },
    [cancelFinancialRequest, getPendingRequests]
  )

  const handleApprove = useCallback(
    (requestId, gross_amount, request_type) => {
      if (request_type === FINANCIALREQUEST_TYPE.SENDINVOICE) {
        approveFinancialRequest({
          id: requestId,
          success: () => getPendingRequests()
        })
      } else {
        const dashboard = true
        show('approveRequestModal', { requestId, gross_amount, dashboard })
      }
    },
    [show, approveFinancialRequest, getPendingRequests]
  )

  const handleDecline = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to decline the request?',
        proceed: () => {
          declineFinancialRequest({
            id,
            success: () => getPendingRequests()
          })
        }
      })
    },
    [show, declineFinancialRequest, getPendingRequests]
  )

  return (
    <>
      <Grid container spacing={4}>
        {statsIsLoading ? (
          <Spinner />
        ) : (
          <>
            <Grid item xs={3}>
              <StatCard title="This Month's Expectation" amount={stats ? stats.this_month_expectation : 0} />
            </Grid>
            <Grid item xs={3}>
              <StatCard title="This Month's Earning" amount={stats ? stats.this_month_earning : 0} />
            </Grid>
            <Grid item xs={3}>
              <StatCard title="This Quarter's Expectation" amount={stats ? stats.this_quarter_expectation : 0} />
            </Grid>
            <Grid item xs={3}>
              <StatCard title="This Quarter's Earning" amount={stats ? stats.this_quarter_earning : 0} />
            </Grid>
          </>
        )}
        {weeklyIncomeIsLoading ? (
          <Spinner />
        ) : (
          <Grid item xs={12}>
            <Widget title="Weekly Income" disableWidgetMenu bodyClass={classes.wrapper} noBodyPadding>
              <WeeklyIncomeLineChart data={weeklyIncome} />
            </Widget>
          </Grid>
        )}
        {ongoingProjectsIsLoading ? (
          <Spinner />
        ) : (
          <Grid item xs={12}>
            <Widget title="Ongoing Projects" disableWidgetMenu noBodyPadding>
              {ongoingProjects && ongoingProjects.length > 0 ? (
                <ProjectTable data={projectsData} role={me.role} disableActions />
              ) : (
                <Typography className={classes.noItems} variant="body1">
                  No ongoing projects.
                </Typography>
              )}
            </Widget>
          </Grid>
        )}
        {pendingRequestsIsLoading ? (
          <Spinner />
        ) : (
          <Grid item xs={12}>
            <Widget title="Pending Financial Requests" disableWidgetMenu noBodyPadding>
              {pendingFinancialRequests && pendingFinancialRequests.length > 0 ? (
                <FinancialRequestTable
                  data={financialRequestsData}
                  me={me}
                  onCancel={handleCancel}
                  onApprove={handleApprove}
                  onDecline={handleDecline}
                  fromDashboard
                />
              ) : (
                <Typography className={classes.noItems} variant="body1">
                  No pending requests.
                </Typography>
              )}
            </Widget>
          </Grid>
        )}
      </Grid>
      <ApproveRequestModal />
    </>
  )
}

const actions = {
  getOngoingProjects,
  getWeeklyIncome,
  getStats,
  getPendingRequests,
  getApprovedRequests,
  cancelFinancialRequest,
  declineFinancialRequest,
  approveFinancialRequest,
  show
}

const selectors = createStructuredSelector({
  ongoingProjects: ongoingProjectsSelector,
  weeklyIncome: weeklyIncomeSelector,
  stats: statsSelector,
  pendingFinancialRequests: pendingRequestsSelector,
  approvedFinancialRequests: approvedRequestsSelector,
  ongoingProjectsIsLoading: ongoingProjectsLoadingSelector,
  weeklyIncomeIsLoading: weeklyIncomeLoadingSelector,
  statsIsLoading: statsLoadingSelector,
  pendingRequestsIsLoading: pendingRequestsLoadingSelector,
  approvedRequestsIsLoading: approvedRequestsLoadingSelector,
  me: meSelector
})

Dashboard.prototype = {
  getOngoingProjects: PropTypes.func.isRequired,
  getWeeklyIncome: PropTypes.func.isRequired,
  getStats: PropTypes.func.isRequired,
  getPendingRequests: PropTypes.func.isRequired,
  getApprovedRequests: PropTypes.func.isRequired,
  ongoingProjects: PropTypes.array.isRequired,
  weeklyIncome: PropTypes.array.isRequired,
  stats: PropTypes.object.isRequired,
  pendingFinancialRequests: PropTypes.array.isRequired,
  approvedFinancialRequests: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  cancelFinancialRequest: PropTypes.func.isRequired,
  declineFinancialRequest: PropTypes.func.isRequired,
  approveFinancialRequest: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired
}

export default connect(selectors, actions)(Dashboard)
