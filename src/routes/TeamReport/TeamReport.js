import React, { useEffect, useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import { teamReportSelector, getTeamReport, teamReportLoadingSelector } from 'store/modules/teamReport'
import TeamReportTable from './TeamReportTable'
import { periodOptions } from 'config/constants'
import SimpleSelect from 'components/SimpleSelect'
import { jsonToQueryString, parseQueryString } from 'helpers/utils'

const TeamReport = ({ teamReport, getTeamReport, isTeamReportLoading, location, history }) => {
  useEffect(() => {
    let { period } = parseQueryString(location.search)
    if (!period) period = 'monthly'
    getTeamReport(period)
  }, [getTeamReport, location.search])

  const handleChange = useCallback(
    event => {
      history.push({
        search: jsonToQueryString({
          period: event.target.value
        })
      })
    },
    [history]
  )

  if (isTeamReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Individual Reports" disableWidgetMenu>
            <SimpleSelect label="Period" defaultValue="monthly" options={periodOptions} onChange={handleChange} />
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
