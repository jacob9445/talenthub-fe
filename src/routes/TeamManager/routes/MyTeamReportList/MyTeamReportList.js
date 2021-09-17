import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Grid, Button } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import DatePicker from 'components/DatePicker'
import { periodOptions } from 'config/constants'
import SimpleSelect from 'components/SimpleSelect'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import IndividualReportTable from 'routes/Admin/routes/Reports/components/IndividualReportTable'
import { myTeamReportSelector, getMyTeamReports, myTeamReportLoadingSelector } from 'store/modules/report'
import useStyles from './styles'

const MyTeamReportList = ({
  myTeamReports,
  getMyTeamReports,
  isMyTeamReportLoading,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  location,
  history
}) => {
  const [showCustom, setShowCustom] = useState(false)
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
      getMyTeamReports({
        period,
        params: pagination
      })
    }
    if (from) {
      getMyTeamReports({
        period,
        params: {
          pagination,
          from,
          to
        }
      })
    }
  }, [getMyTeamReports, pagination, queryObj])

  const handleFilter = useCallback(() => {
    if (!filterFrom || !filterTo) {
      alert('Select date range!')
    } else {
      const { page, page_size } = queryObj
      history.push({
        search: jsonToQueryString({
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

  const handleFromChange = useCallback(event => {
    setFilterFrom(event.target.value)
  }, [])

  const handleToChange = useCallback(event => {
    setFilterTo(event.target.value)
  }, [])

  if (isMyTeamReportLoading) {
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
                <DatePicker label="From" onChange={handleFromChange} id="from" />
                <DatePicker label="To" onChange={handleToChange} id="to" />
                <Button variant="contained" color="primary" onClick={handleFilter}>
                  Filter
                </Button>
              </div>
            ) : null}
            <IndividualReportTable
              data={myTeamReports}
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
  getMyTeamReports
}

const selector = createStructuredSelector({
  myTeamReports: myTeamReportSelector,
  isMyTeamReportLoading: myTeamReportLoadingSelector
})

MyTeamReportList.propTypes = {
  myTeamReports: PropTypes.object,
  getMyTeamReports: PropTypes.func.isRequired,
  isMyTeamReportLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, withPaginationInfo, connect(selector, actions))(MyTeamReportList)
