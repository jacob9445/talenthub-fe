import React, { useEffect, useCallback, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import DatePicker from 'components/DatePicker'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'

import {
  individualReportSelector,
  getIndividualReport,
  individualReportLoadingSelector
} from 'store/modules/individualReport'
import IndividualReportTable from '../../components/IndividualReportTable'
import { periodOptions } from 'config/constants'
import SimpleSelect from 'components/SimpleSelect'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import useStyles from './styles'

const IndividualReportList = ({
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
  const { period = 'this-month', from, to } = parseQueryString(location.search)
  useEffect(() => {
    const { from, to } = parseQueryString(location.search)
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
  }, [getIndividualReport, pagination, location.search, period])

  const handlePeriodChange = useCallback(
    event => {
      if (event.target.value !== 'custom') {
        setShowCustom(0)
        const { page, page_size } = parseQueryString(location.search)
        history.push({
          search: jsonToQueryString({
            period: event.target.value,
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
              period={{ period: period, from: from, to: to }}
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
