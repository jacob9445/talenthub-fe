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
import { getTeams, teamsSelector } from 'store/modules/team'
import ProjectTable from 'routes/Shared/Project/components/ProjectTable'
import FinancialRequestTable from 'routes/Shared/FinancialRequest/components/FinancialRequestTable'
import { meSelector } from 'store/modules/auth'
import {
  cancelFinancialRequest,
  declineFinancialRequest,
  approveFinancialRequest
} from 'store/modules/financialRequest'
import ApproveRequestModal from 'components/ApproveRequestModal'
import { FINANCIALREQUEST_TYPE } from 'config/constants'
import StatCard from 'components/StatCard'
import DashboardFilter from 'routes/Shared/Dashboard/components/DashboardFilter'

import { ROLES } from 'config/constants'
import { parseQueryString } from 'helpers/utils'

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
  approvedRequestsIsLoading,
  teams,
  getTeams,
  location,
  history
}) => {
  const classes = useStyles()
  const queryObj = useMemo(
    () => ({
      ...parseQueryString(location.search)
    }),
    [location.search]
  )

  const { team: teamId } = queryObj

  useEffect(() => {
    const { team, user } = queryObj
    getOngoingProjects({
      params: { team, user }
    })
  }, [getOngoingProjects, queryObj])

  useEffect(() => {
    const { team, user } = queryObj
    getWeeklyIncome({
      params: { team, user }
    })
  }, [getWeeklyIncome, queryObj])

  useEffect(() => {
    const { team, user } = queryObj
    getStats({
      params: { team, user }
    })
  }, [getStats, queryObj])

  useEffect(() => {
    const { team, user } = queryObj
    getPendingRequests({
      params: { team, user }
    })
  }, [getPendingRequests, queryObj])

  useEffect(() => {
    const { team, user } = queryObj
    getApprovedRequests({
      params: { team, user }
    })
  }, [getApprovedRequests, queryObj])

  useEffect(() => {
    if (me.role === ROLES.ADMIN) getTeams()
  }, [getTeams, me.role])

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
      declineFinancialRequest({
        id,
        message: 'Are you sure to decline this request?',
        success: getPendingRequests
      })
    },
    [declineFinancialRequest, getPendingRequests]
  )

  const teamOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...(teams
        ? teams.map(team => ({
            value: team.id.toString(),
            label: team.name
          }))
        : [])
    ],
    [teams]
  )

  return (
    <>
      <Grid container spacing={4}>
        <DashboardFilter teamId={teamId} teamOptions={teamOptions} location={location} history={history} />
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
  show,
  getTeams
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
  me: meSelector,
  teams: teamsSelector
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
