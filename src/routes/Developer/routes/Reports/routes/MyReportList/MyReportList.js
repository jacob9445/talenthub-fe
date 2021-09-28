import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Button, Grid } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { DatePicker } from 'material-ui-pickers'
import { format } from 'date-fns'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'

import {
  getSelfFinancialReport,
  selfFinancialReportLoadingSelector,
  selfFinancialReportSelector
} from 'store/modules/report'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import MyReportTable from '../../components/MyReportTable'
import SimpleSelect from 'components/SimpleSelect'
import useStyles from './styles'
import withPaginationInfo from 'hocs/withPaginationInfo'

const MyReportList = ({
  myReport,
  getSelfFinancialReport,
  isMyReportLoading,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  location,
  history
}) => {
  const queryObj = useMemo(
    () => ({
      period: 'this-month',
      ...parseQueryString(location.search)
    }),
    [location.search]
  )

  const initialShowCustom = queryObj.period === 'custom' ? 1 : 0
  const [showCustom, setShowCustom] = useState(initialShowCustom)
  const [filterFrom, setFilterFrom] = useState(queryObj.from)
  const [filterTo, setFilterTo] = useState(queryObj.to)
  const classes = useStyles()

  useEffect(() => {
    const { from, to, period } = queryObj
    if (!from && period !== 'custom') {
      getSelfFinancialReport({
        params: {
          period,
          pagination
        }
      })
    }
    if (from) {
      getSelfFinancialReport({
        params: {
          period,
          ...pagination,
          from,
          to
        }
      })
    }
  }, [getSelfFinancialReport, pagination, queryObj])

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

  const handleFromChange = useCallback(
    date => {
      setFilterFrom(format(date, 'yyyy-MM-dd'))
    },
    [setFilterFrom]
  )

  const handleToChange = useCallback(
    date => {
      setFilterTo(format(date, 'yyyy-MM-dd'))
    },
    [setFilterTo]
  )

  const handleFilter = useCallback(() => {
    if (!filterFrom || !filterTo) {
      alert('Select date range!')
    } else {
      const { page, page_size } = parseQueryString(location.search)
      history.push({
        search: jsonToQueryString({
          period: 'custom',
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
          <Widget title="My Report" disableWidgetMenu>
            <SimpleSelect
              label="Period"
              value={queryObj.period}
              options={periodOptions}
              onChange={handlePeriodChange}
            />
            {showCustom ? (
              <div className={classes.dateRangeFilter}>
                <DatePicker
                  className={classes.datePicker}
                  label="From"
                  onChange={handleFromChange}
                  id="from"
                  value={filterFrom}
                />
                <DatePicker
                  className={classes.datePicker}
                  label="To"
                  onChange={handleToChange}
                  id="to"
                  value={filterTo}
                />
                <Button variant="contained" color="primary" onClick={handleFilter}>
                  Filter
                </Button>
              </div>
            ) : null}
            {myReport ? (
              <MyReportTable
                data={myReport[0]}
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
  getSelfFinancialReport
}

const selector = createStructuredSelector({
  myReport: selfFinancialReportSelector,
  isMyReportLoading: selfFinancialReportLoadingSelector
})

MyReportList.propTypes = {
  myReport: PropTypes.array,
  getSelfFinancialReport: PropTypes.func.isRequired,
  isMyReportLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(MyReportList)
