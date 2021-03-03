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
import useStyles from './styles'

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
  const [showCustom, setShowCustom] = useState(0)
  const [filterFrom, setFilterFrom] = useState(null)
  const [filterTo, setFilterTo] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    let { period, from, to } = parseQueryString(location.search)
    if (!period && !from) period = 'this-month'
    if (!from) {
      getIndividualReport({
        period,
        params: pagination
      })
    } else {
      getIndividualReport({
        period: 'custom',
        params: {
          ...pagination,
          from,
          to
        }
      })
    }
  }, [getIndividualReport, pagination, location.search])

  const handlePeriodChange = useCallback(
    event => {
      if (event.target.value !== 'custom') {
        setShowCustom(0)
        let { period, page, page_size } = parseQueryString(location.search)
        period = event.target.value
        history.push({
          search: jsonToQueryString({
            period,
            page,
            page_size
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
      const { page, page_size } = parseQueryString(location.search)
      history.push({
        search: jsonToQueryString({
          from: filterFrom,
          to: filterTo,
          page,
          page_size
        })
      })
    }
  }, [filterFrom, filterTo, location.search, history])

  if (isIndividualReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Individual Reports" disableWidgetMenu>
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
