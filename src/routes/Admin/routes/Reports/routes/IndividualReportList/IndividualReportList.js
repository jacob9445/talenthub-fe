import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { DatePicker } from 'material-ui-pickers'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import {
  developersEarningLoadingSelector,
  developersEarningSelector,
  getDevelopersEarningReport,
  getTotalEarningReport,
  totalEarningLoadingSelector,
  totalEarningSelector
} from 'store/modules/report'
import { getTeams, teamsSelector } from 'store/modules/team'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
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
  const [filterFrom, setFilterFrom] = useState(queryObj.from)
  const [filterTo, setFilterTo] = useState(queryObj.to)
  const classes = useStyles()

  useEffect(() => {
    const { from, to, team = 'all', period } = queryObj
    if (!from && period !== 'custom') {
      getDevelopersEarningReport({
        params: {
          period,
          team: team === 'all' ? undefined : team,
          pagination
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
          pagination,
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

  const handleFromChange = useCallback(date => {
    setFilterFrom(format(date, 'yyyy-MM-dd'))
  }, [])

  const handleToChange = useCallback(date => {
    setFilterTo(format(date, 'yyyy-MM-dd'))
  }, [])

  const handleFilter = useCallback(() => {
    if (!filterFrom || !filterTo) {
      alert('Select date range!')
    } else {
      const { page, page_size } = queryObj
      history.push({
        search: jsonToQueryString({
          period: 'custom',
          from: filterFrom,
          to: filterTo,
          page,
          page_size
        })
      })
    }
  }, [filterFrom, filterTo, queryObj, history])

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
              <Grid container spacing={2} alignItems="center" justify="flex-end">
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
                <DatePicker
                  className={classes.datePicker}
                  label="From"
                  onChange={handleFromChange}
                  value={filterFrom}
                  id="from"
                />
                <DatePicker
                  className={classes.datePicker}
                  label="To"
                  onChange={handleToChange}
                  value={filterTo}
                  id="to"
                />
                <Button variant="contained" color="primary" onClick={handleFilter}>
                  Filter
                </Button>
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
  getDevelopersEarningReport
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
