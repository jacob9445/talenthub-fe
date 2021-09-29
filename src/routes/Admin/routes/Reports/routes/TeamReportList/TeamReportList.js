import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getTeamsEarningReport, teamsEarningSelector, teamsEarningLoadingSelector } from 'store/modules/report'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import DatePicker from 'components/DatePicker'
import SimpleSelect from 'components/SimpleSelect'
import Spinner from 'components/Spinner'
import TeamReportTable from '../../components/TeamReportTable'
import useStyles from './styles'
import Widget from 'components/Widget'

const TeamReportList = ({ teamsReport, getTeamsEarningReport, isTeamsReportLoading, location, history }) => {
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
    const { from, to, period } = queryObj
    if (!from) {
      getTeamsEarningReport({
        params: {
          period
        }
      })
    } else {
      getTeamsEarningReport({
        params: {
          period: 'custom',
          from,
          to
        }
      })
    }
  }, [getTeamsEarningReport, queryObj])

  const handlePeriodChange = useCallback(
    event => {
      const period = event.target.value
      if (period !== 'custom') {
        setShowCustom(0)
        history.push({
          search: jsonToQueryString({
            period
          })
        })
      } else {
        setShowCustom(1)
      }
    },
    [history]
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
      history.push({
        search: jsonToQueryString({
          from: filterFrom,
          to: filterTo
        })
      })
    }
  }, [filterFrom, filterTo, history])

  if (isTeamsReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget
            title="Teams"
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
              </Grid>
            }>
            {showCustom ? (
              <div className={classes.dateRangeFilter}>
                <DatePicker label="From" onChange={handleFromChange} id="from" />
                <DatePicker label="To" onChange={handleToChange} id="to" />
                <Button variant="contained" color="primary" onClick={handleFilter}>
                  Filter
                </Button>
              </div>
            ) : null}
            <TeamReportTable data={teamsReport} />
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getTeamsEarningReport
}

const selector = createStructuredSelector({
  teamsReport: teamsEarningSelector,
  isTeamsReportLoading: teamsEarningLoadingSelector
})

TeamReportList.propTypes = {
  teamsReport: PropTypes.array,
  getTeamsReport: PropTypes.func,
  isTeamsReportLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, connect(selector, actions))(TeamReportList)
