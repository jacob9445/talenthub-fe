import React, { useEffect, useCallback, useState } from 'react'
import { Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
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
import withPaginationInfo from 'hocs/withPaginationInfo'

const IndividualReport = ({
  individualReport,
  getIndividualReport,
  isIndividualReportLoading,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  let [period, setPeriod] = useState('monthly')

  useEffect(() => {
    getIndividualReport({
      period,
      params: pagination
    })
  }, [getIndividualReport, pagination, period])

  const handleChange = useCallback(
    event => {
      setPeriod(event.target.value)
    },
    [setPeriod]
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
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(
  withPaginationInfo,
  connect(
    selector,
    actions
  )
)(IndividualReport)
