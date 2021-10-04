import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { CloudDownload } from '@material-ui/icons'
import { Grid, Tooltip, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import {
  developersEarningLoadingSelector,
  developersEarningSelector,
  getDevelopersEarningReport,
  getTotalEarningReport,
  totalEarningLoadingSelector,
  totalEarningSelector,
  downloadDevelopersEarning
} from 'store/modules/report'
import { getTeams, teamsSelector } from 'store/modules/team'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import DateRangePickerForm, { validationSchema } from 'components/DateRangePickerForm'
import IndividualReportTable from '../../components/IndividualReportTable'
import SimpleSelect from 'components/SimpleSelect'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import Widget from 'components/Widget'
import withPaginationInfo from 'hocs/withPaginationInfo'

const IndividualReportList = ({
  teams,
  totalEarning,
  totalEarningLoading,
  developersEarning,
  developersEarningLoading,
  getTeams,
  getTotalEarningReport,
  getDevelopersEarningReport,
  downloadDevelopersEarning,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  location,
  history
}) => {
  const queryObj = useMemo(
    () => ({
      period: 'this-month',
      ...parseQueryString(location.search)
    }),
    [location.search]
  )

  const initialShowCustom = queryObj.period === 'custom' ? 1 : 0
  const [showCustom, setShowCustom] = useState(initialShowCustom)
  const classes = useStyles()

  const getTeamName = useCallback(
    teamId =>
      R.compose(R.prop('name'), R.defaultTo({ name: 'All' }), R.find(R.propEq('id', teamId)), R.defaultTo([]))(teams),
    [teams]
  )

  useEffect(() => {
    const { from, to, team = 'all', period } = queryObj
    if (!from && period !== 'custom') {
      getDevelopersEarningReport({
        params: {
          period,
          team: team === 'all' ? undefined : team,
          ...pagination
        }
      })
      getTotalEarningReport({
        params: {
          period
        }
      })
    }
    if (from) {
      getDevelopersEarningReport({
        params: {
          period,
          team: team === 'all' ? undefined : team,
          ...pagination,
          from,
          to
        }
      })
      getTotalEarningReport({
        params: {
          period,
          from,
          to
        }
      })
    }
    getTeams()
  }, [getDevelopersEarningReport, getTotalEarningReport, getTeams, pagination, queryObj])

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

  const handleTeamChange = useCallback(
    event => {
      const { period, from, to } = queryObj
      const team = event.target.value
      if (team !== 'all') {
        history.push({
          search: jsonToQueryString({
            period,
            team,
            from,
            to
          })
        })
      } else {
        history.push({
          search: jsonToQueryString({
            period
          })
        })
      }
    },
    [history, queryObj]
  )

  const handlePeriodChange = useCallback(
    event => {
      const { team, page, page_size } = queryObj
      const period = event.target.value
      if (period !== 'custom') {
        setShowCustom(0)
        history.push({
          search: jsonToQueryString({
            team,
            period,
            page,
            page_size
          })
        })
      } else {
        setShowCustom(1)
        history.push({
          search: jsonToQueryString({
            period
          })
        })
      }
    },
    [history, queryObj]
  )

  const handleSubmit = useCallback(
    (formValues, formActions) => {
      if (!formValues.from || !formValues.to) {
        return
      } else {
        const { page, page_size } = queryObj
        history.push({
          search: jsonToQueryString({
            period: 'custom',
            from: formValues.from,
            to: formValues.to,
            page,
            page_size
          })
        })
      }
    },
    [history, queryObj]
  )

  const initialValues = {
    from: queryObj.from || null,
    to: queryObj.to || null
  }

  const teamName = getTeamName(Number(queryObj.team))

  const handleDownload = useCallback(() => {
    const { from, to, period, team } = queryObj
    if (!from) {
      downloadDevelopersEarning({
        teamName,
        params: {
          period,
          team
        }
      })
    } else {
      downloadDevelopersEarning({
        teamName,
        params: {
          team,
          period: 'custom',
          from,
          to
        }
      })
    }
  }, [downloadDevelopersEarning, queryObj, teamName])

  if (totalEarningLoading || developersEarningLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget
            title="Individuals"
            disableWidgetMenu
            WidgetButton={
              <Grid container spacing={2} alignItems="stretch" justify="flex-end">
                <Grid item>
                  <Tooltip title="Export as CSV" placement="top">
                    <Button onClick={handleDownload} variant="outlined" color="primary" className={classes.download}>
                      <CloudDownload />
                      &nbsp;Export
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <SimpleSelect
                    label="Period"
                    value={queryObj.period}
                    options={periodOptions}
                    onChange={handlePeriodChange}
                  />
                </Grid>
                <Grid item>
                  <SimpleSelect
                    label="Team"
                    value={queryObj.team || 'all'}
                    options={teamOptions}
                    onChange={handleTeamChange}
                  />
                </Grid>
              </Grid>
            }>
            {showCustom ? (
              <div className={classes.dateRangeFilter}>
                <Formik
                  component={DateRangePickerForm}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                />
              </div>
            ) : null}
            <IndividualReportTable
              totalEarning={totalEarning}
              developersEarning={developersEarning}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
              period={queryObj}
            />
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getTeams,
  getTotalEarningReport,
  getDevelopersEarningReport,
  downloadDevelopersEarning
}

const selector = createStructuredSelector({
  teams: teamsSelector,
  totalEarning: totalEarningSelector,
  totalEarningLoading: totalEarningLoadingSelector,
  developersEarning: developersEarningSelector,
  developersEarningLoading: developersEarningLoadingSelector
})

IndividualReportList.propTypes = {
  getTeams: PropTypes.func.isRequired,
  getTotalEarningReport: PropTypes.func.isRequired,
  getDevelopersEarningReport: PropTypes.func.isRequired,
  teams: PropTypes.array,
  totalEarning: PropTypes.object,
  totalEarningLoading: PropTypes.bool.isRequired,
  developersEarning: PropTypes.object,
  developersEarningLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(IndividualReportList)
