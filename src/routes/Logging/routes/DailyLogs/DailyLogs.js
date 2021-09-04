import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { format } from 'date-fns'
import { DatePicker } from 'material-ui-pickers'

import { dailyLogsSelector, getDailyLogs } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import DailyLogTable from '../../components/LogsTable'
import Widget from 'components/Widget'
import useStyles from './styles'
import { ROLES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { ListDataType } from 'helpers/prop-types'

const DailyLogs = ({ getDailyLogs, logs, me, pagination, location, history, onChangePage, onChangeRowsPerPage }) => {
  let classes = useStyles()
  const queryObj = parseQueryString(location.search)
  const selectedDate = queryObj.date || undefined
  const handleDateChange = useCallback(
    date => {
      console.log('date', format(date, 'yyyy-MM-dd'))
      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          date: format(date, 'yyyy-MM-dd')
        })
      })
    },
    [history, location]
  )
  useEffect(() => {
    getDailyLogs({
      role: me.role,
      date: selectedDate,
      params: pagination
    })
  }, [getDailyLogs, me.role, selectedDate, pagination])
  console.log({ logs })

  const viewTodayLog = useCallback(() => {
    const date = Date.now()
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        date: format(date, 'yyyy-MM-dd')
      })
    })
  }, [history, location])

  return (
    <Widget
      title="Daily Logs"
      upperTitle
      noBodyPadding
      bodyClass={classes.tableOverflow}
      disableWidgetMenu
      disableWidgetButton={me.role !== ROLES.ADMIN}
      WidgetButton={
        <Grid container className={classes.grid} spacing={2} alignItems="center" justify="flex-end">
          <Grid item>
            <DatePicker margin="normal" label="Choose a date" value={selectedDate} onChange={handleDateChange} />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewTodayLog}>
              Today
            </Button>
          </Grid>
        </Grid>
      }>
      <DailyLogTable
        data={logs}
        myRole={me.role}
        pagination={pagination}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Widget>
  )
}

const actions = {
  getDailyLogs
}

const selectors = createStructuredSelector({
  logs: dailyLogsSelector,
  me: meSelector
})

DailyLogs.propTypes = {
  logs: ListDataType,
  me: PropTypes.object,
  getDailyLogs: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(DailyLogs)
