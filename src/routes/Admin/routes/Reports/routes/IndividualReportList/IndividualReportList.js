import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Grid, Button } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import DatePicker from 'components/DatePicker'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'

import { individualReportSelector, getIndividualReport, individualReportLoadingSelector } from 'store/modules/report'
import IndividualReportTable from '../../components/IndividualReportTable'
import { periodOptions } from 'config/constants'
import SimpleSelect from 'components/SimpleSelect'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { getTeams, teamsSelector } from 'store/modules/team'
import useStyles from './styles'

const IndividualReportList = ({
  teams,
  getTeams,
  individualReport,
  getIndividualReport,
  isIndividualReportLoading,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  location,
  history
}) => {
  const [showCustom, setShowCustom] = useState(0)
  const [filterFrom, setFilterFrom] = useState(null)
  const [filterTo, setFilterTo] = useState(null)
  const classes = useStyles()
  const queryObj = useMemo(
    () => ({
      period: 'this-month',
      ...parseQueryString(location.search)
    }),
    [location.search]
  )

  useEffect(() => {
    const { from, to, team = 'all', period } = queryObj
    if (!from && period !== 'custom') {
      getIndividualReport({
        period,
        params: {
          team: team === 'all' ? undefined : team,
          pagination
        }
      })
    }
    if (from) {
      getIndividualReport({
        period,
        params: {
          team: team === 'all' ? undefined : team,
          pagination,
          from,
          to
        }
      })
    }
    getTeams()
  }, [getIndividualReport, getTeams, pagination, queryObj])

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
      const { period } = queryObj
      const team = event.target.value
      if (team !== 'all') {
        history.push({
          search: jsonToQueryString({
            period,
            team
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

  const handleFromChange = useCallback(event => {
    setFilterFrom(event.target.value)
  }, [])

  const handleToChange = useCallback(event => {
    setFilterTo(event.target.value)
  }, [])

  const handleFilter = useCallback(() => {
    if (!filterFrom || !filterTo) {
      alert('Select date range!')
    } else {
      const { page, page_size } = queryObj
      history.push({
        search: jsonToQueryString({
          from: filterFrom,
          to: filterTo,
          page,
          page_size
        })
      })
    }
  }, [filterFrom, filterTo, queryObj, history])

  if (isIndividualReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Individual Reports" disableWidgetMenu>
            <SimpleSelect
              label="Period"
              value={queryObj.period}
              options={periodOptions}
              onChange={handlePeriodChange}
            />
            <SimpleSelect
              label="Team"
              value={queryObj.team || 'all'}
              options={teamOptions}
              onChange={handleTeamChange}
            />
            {showCustom ? (
              <div className={classes.dateRangeFilter}>
                <DatePicker label="From" onChange={handleFromChange} id="from" />
                <DatePicker label="To" onChange={handleToChange} id="to" />
                <Button variant="contained" color="primary" onClick={handleFilter}>
                  Filter
                </Button>
              </div>
            ) : null}
            <IndividualReportTable
              data={individualReport}
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
  getIndividualReport,
  getTeams
}

const selector = createStructuredSelector({
  teams: teamsSelector,
  individualReport: individualReportSelector,
  isIndividualReportLoading: individualReportLoadingSelector
})

IndividualReportList.propTypes = {
  individualReport: PropTypes.object,
  getIndividualReport: PropTypes.func.isRequired,
  isIndividualReportLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(IndividualReportList)
