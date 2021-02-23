import React, { useEffect, useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import {
  individualReportSelector,
  getIndividualReport,
  individualReportLoadingSelector
} from 'store/modules/individualReport'
import IndividualReportTable from './IndividualReportTable'
import { periodOptions } from 'config/constants'
import SimpleSelect from 'components/SimpleSelect'
import { jsonToQueryString, parseQueryString } from 'helpers/utils'

const IndividualReport = ({ individualReport, getIndividualReport, isIndividualReportLoading, location, history }) => {
  useEffect(() => {
    const period = parseQueryString(location.search)
    getIndividualReport(period.period)
  }, [getIndividualReport, location.search])

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

  if (isIndividualReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Individual Reports" disableWidgetMenu>
            <SimpleSelect label="Period" defaultValue="monthly" options={periodOptions} onChange={handleChange} />
            <IndividualReportTable data={individualReport} />
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getIndividualReport
}

const selector = createStructuredSelector({
  individualReport: individualReportSelector,
  isIndividualReportLoading: individualReportLoadingSelector
})

IndividualReport.propTypes = {
  individualReport: PropTypes.array,
  getIndividualReport: PropTypes.func.isRequired,
  isIndividualReportLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(IndividualReport)
