import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Button, Grid } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import DatePicker from 'components/DatePicker'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'

import { myReportSelector, myReportLoadingSelector, getMyReport } from 'store/modules/myReport'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import MyReportTable from '../../components/MyReportTable'
import SimpleSelect from 'components/SimpleSelect'
import useStyles from './styles'
import withPaginationInfo from 'hocs/withPaginationInfo'

const MyReportList = ({
  myReport,
  getMyReport,
  isMyReportLoading,
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
  const queryObj = useMemo(
    () => ({
      period: 'this-month',
      ...parseQueryString(location.search)
    }),
    [location.search]
  )

  useEffect(() => {
    const { from, to, period } = queryObj
    if (!from && period !== 'custom') {
      getMyReport({
        period,
        params: {
          pagination
        }
      })
    }
    if (from) {
      getMyReport({
        period,
        params: {
          ...pagination,
          from,
          to
        }
      })
    }
  }, [getMyReport, pagination, queryObj])

  const handlePeriodChange = useCallback(
    event => {
      const period = event.target.value
      const { page, page_size } = parseQueryString(location.search)
      if (period !== 'custom') {
        setShowCustom(0)
        history.push({
          search: jsonToQueryString({
            period,
            page,
            page_size
          })
        })
      } else {
        setShowCustom(1)
        history.push({
          search: jsonToQueryString({
            period,
            page,
            page_size
          })
        })
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
      const { period, page, page_size } = parseQueryString(location.search)
      history.push({
        search: jsonToQueryString({
          period,
          from: filterFrom,
          to: filterTo,
          page,
          page_size
        })
      })
    }
  }, [filterFrom, filterTo, location.search, history])

  if (isMyReportLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="My Reports" disableWidgetMenu>
            <SimpleSelect
              label="Period"
              value={queryObj.period}
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
            {myReport ? (
              <MyReportTable
                data={myReport.results[0]}
                pagination={pagination}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            ) : null}
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getMyReport
}

const selector = createStructuredSelector({
  myReport: myReportSelector,
  isMyReportLoading: myReportLoadingSelector
})

MyReportList.propTypes = {
  myReport: PropTypes.object,
  getMyReport: PropTypes.func.isRequired,
  isMyReportLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(MyReportList)
