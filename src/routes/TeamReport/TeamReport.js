import React, { useEffect, useCallback, useState } from 'react'
import { Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import { teamReportSelector, getTeamReport, teamReportLoadingSelector } from 'store/modules/teamReport'
import TeamReportTable from './TeamReportTable'
import { periodOptions } from 'config/constants'
import SimpleSelect from 'components/SimpleSelect'
import withPaginationInfo from 'hocs/withPaginationInfo'

const TeamReport = ({
  teamReport,
  getTeamReport,
  isTeamReportLoading,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  let [period, setPeriod] = useState('monthly')

  useEffect(() => {
    getTeamReport({
      period,
      params: pagination
    })
  }, [getTeamReport, pagination, period])

  const handleChange = useCallback(
    event => {
      setPeriod(event.target.value)
    },
    [setPeriod]
  )

  if (isTeamReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Team Reports" disableWidgetMenu>
            <SimpleSelect label="Period" defaultValue="monthly" options={periodOptions} onChange={handleChange} />
            <TeamReportTable
              data={teamReport}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
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
  teamReport: PropTypes.object,
  getTeamReport: PropTypes.func.isRequired,
  isTeamReportLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(
  withPaginationInfo,
  connect(
    selector,
    actions
  )
)(TeamReport)
