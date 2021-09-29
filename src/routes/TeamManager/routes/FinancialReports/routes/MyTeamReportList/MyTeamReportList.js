import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Button } from '@material-ui/core'
import { format } from 'date-fns'
import { withRouter } from 'react-router-dom'
import { DatePicker } from 'material-ui-pickers'
import PropTypes from 'prop-types'

import {
  developersEarningLoadingSelector,
  developersEarningSelector,
  getDevelopersEarningReport,
  getTotalEarningReport,
  totalEarningLoadingSelector,
  totalEarningSelector
} from 'store/modules/report'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { periodOptions } from 'config/constants'
import IndividualReportTable from 'routes/Admin/routes/Reports/components/IndividualReportTable'
import SimpleSelect from 'components/SimpleSelect'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import Widget from 'components/Widget'
import withPaginationInfo from 'hocs/withPaginationInfo'

const MyTeamReportList = ({
  totalEarning,
  isTotalEarningLoading,
  developersEarning,
  isDevelopersEarningLoading,
  getDevelopersEarningReport,
  getTotalEarningReport,
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
      getDevelopersEarningReport({
        params: {
          period,
          pagination
        }
      })
      getTotalEarningReport({
        params: {
          period
        }
      })
    }
    if (from) {
      getDevelopersEarningReport({
        params: {
          period,
          pagination,
          from,
          to
        }
      })
      getTotalEarningReport({
        params: {
          period,
          from,
          to
        }
      })
    }
  }, [getDevelopersEarningReport, getTotalEarningReport, pagination, queryObj])

  const handleFilter = useCallback(() => {
    if (!filterFrom || !filterTo) {
      alert('Select date range!')
    } else {
      const { page, page_size } = queryObj
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
  }, [filterFrom, filterTo, queryObj, history])

  const handlePeriodChange = useCallback(
    event => {
      const { page, page_size } = queryObj
      const period = event.target.value
      if (period !== 'custom') {
        setShowCustom(false)
        history.push({
          search: jsonToQueryString({
            period,
            page,
            page_size
          })
        })
      } else {
        setShowCustom(true)
        history.push({
          search: jsonToQueryString({
            period
          })
        })
      }
    },
    [history, queryObj]
  )

  const handleFromChange = useCallback(date => {
    setFilterFrom(format(date, 'yyyy-MM-dd'))
  }, [])

  const handleToChange = useCallback(date => {
    setFilterTo(format(date, 'yyyy-MM-dd'))
  }, [])

  if (isTotalEarningLoading || isDevelopersEarningLoading) {
    return <Spinner />
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="My Team Reports" disableWidgetMenu>
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
            <IndividualReportTable
              totalEarning={totalEarning}
              developersEarning={developersEarning}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
              period={queryObj}
            />
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getTotalEarningReport,
  getDevelopersEarningReport
}

const selector = createStructuredSelector({
  totalEarning: totalEarningSelector,
  isTotalEarningLoading: totalEarningLoadingSelector,
  developersEarning: developersEarningSelector,
  isDevelopersEarningLoading: developersEarningLoadingSelector
})

MyTeamReportList.propTypes = {
  getTotalEarningReport: PropTypes.func.isRequired,
  getDevelopersEarningReport: PropTypes.func.isRequired,
  totalEarning: PropTypes.object,
  isTotalEarningLoading: PropTypes.bool.isRequired,
  developersEarning: PropTypes.object,
  isDevelopersEarningLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(MyTeamReportList)
