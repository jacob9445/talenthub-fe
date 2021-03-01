import React, { useEffect, useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

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
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'

const IndividualReport = ({
  individualReport,
  getIndividualReport,
  isIndividualReportLoading,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  location,
  history
}) => {
  useEffect(() => {
    let { period } = parseQueryString(location.search)
    if (typeof period === 'undefined') period = 'monthly'
    getIndividualReport({
      period,
      params: pagination
    })
  }, [getIndividualReport, pagination, location.search])

  const handleChange = useCallback(
    event => {
      if (location.search) {
        let { period, page, page_size } = parseQueryString(location.search)
        period = event.target.value
        if (typeof page === 'undefined') {
          history.push({
            search: jsonToQueryString({
              period
            })
          })
        } else {
          history.push({
            search: jsonToQueryString({
              period,
              page,
              page_size
            })
          })
        }
      } else {
        history.push({
          search: jsonToQueryString({
            period: event.target.value
          })
        })
      }
    },
    [history, location.search]
  )

  if (isIndividualReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Individual Reports" disableWidgetMenu>
            <SimpleSelect label="Period" defaultValue="monthly" options={periodOptions} onChange={handleChange} />
            <IndividualReportTable
              data={individualReport}
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
  getIndividualReport
}

const selector = createStructuredSelector({
  individualReport: individualReportSelector,
  isIndividualReportLoading: individualReportLoadingSelector
})

IndividualReport.propTypes = {
  individualReport: PropTypes.object,
  getIndividualReport: PropTypes.func.isRequired,
  isIndividualReportLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(
  withRouter,
  withPaginationInfo,
  connect(
    selector,
    actions
  )
)(IndividualReport)
