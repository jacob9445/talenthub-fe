import React, { useEffect, useCallback, useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import DatePicker from 'components/DatePicker'
import { teamReportSelector, getTeamReport, teamReportLoadingSelector } from 'store/modules/teamReport'
import TeamReportTable from './TeamReportTable'
import { periodOptions } from 'config/constants'
import SimpleSelect from 'components/SimpleSelect'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import useStyles from './styles'

const TeamReport = ({ teamReport, getTeamReport, isTeamReportLoading, location, history }) => {
  const [showCustom, setShowCustom] = useState(0)
  const [filterFrom, setFilterFrom] = useState(null)
  const [filterTo, setFilterTo] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    let { period, from, to } = parseQueryString(location.search)
    if (!period && !from) period = 'this-month'
    if (!from) {
      getTeamReport({
        period
      })
    } else {
      getTeamReport({
        period: 'custom',
        params: {
          from,
          to
        }
      })
    }
  }, [getTeamReport, location.search])

  const handlePeriodChange = useCallback(
    event => {
      if (event.target.value !== 'custom') {
        setShowCustom(0)
        let { period } = parseQueryString(location.search)
        period = event.target.value
        history.push({
          search: jsonToQueryString({
            period
          })
        })
      } else {
        setShowCustom(1)
      }
    },
    [history, location.search]
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

  if (isTeamReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Team Reports" disableWidgetMenu>
            <SimpleSelect
              label="Period"
              defaultValue="this-month"
              options={periodOptions}
              onChange={handlePeriodChange}
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
            <TeamReportTable data={teamReport} />
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getTeamReport
}

const selector = createStructuredSelector({
  teamReport: teamReportSelector,
  isTeamReportLoading: teamReportLoadingSelector
})

TeamReport.propTypes = {
  teamReport: PropTypes.array,
  getTeamReport: PropTypes.func.isRequired,
  isTeamReportLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(TeamReport)
