import React, { useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { format } from 'date-fns'
import { DatePicker } from 'material-ui-pickers'

import LogCard from 'routes/Shared/MyLogs/components/LogCard'
import MyLogLayout from 'routes/Shared/MyLogs/components/MyLogLayout'
import useStyles from './styles'
import { getMyDailyLog, createMyDailyLog, updateMyDailyLog, myDailylogSelector } from 'store/modules/mylogs'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import PropTypes from 'prop-types'
import { MyLogType } from 'helpers/prop-types'

const MyDailyLog = ({ getMyDailyLog, createMyDailyLog, updateMyDailyLog, myDailyLog, location, history }) => {
  const classes = useStyles()
  const queryObj = parseQueryString(location.search)
  const selectedDate = queryObj.date || format(new Date(), 'yyyy-MM-dd')

  const handleDateChange = useCallback(
    date => {
      getMyDailyLog({
        date: format(date, 'yyyy-MM-dd')
      })

      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          date: format(date, 'yyyy-MM-dd')
        })
      })
    },
    [history, location, getMyDailyLog]
  )

  const viewTodayLog = useCallback(() => {
    const date = Date.now()
    getMyDailyLog({
      date: format(date, 'yyyy-MM-dd')
    })
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        date: format(date, 'yyyy-MM-dd')
      })
    })
  }, [history, location, getMyDailyLog])

  const handleSaveAchievements = useCallback(
    content => {
      if (myDailyLog?.id) {
        updateMyDailyLog({
          id: myDailyLog.id,
          data: {
            achievements: content
          }
        })
      } else {
        createMyDailyLog({
          data: {
            plan: '',
            achievements: content,
            interval: 'daily',
            created_at: selectedDate
          }
        })
      }
    },
    [updateMyDailyLog, createMyDailyLog, myDailyLog, selectedDate]
  )

  const handleSavePlan = useCallback(
    content => {
      if (myDailyLog?.id) {
        updateMyDailyLog({
          id: myDailyLog.id,
          data: {
            plan: content
          }
        })
      } else {
        createMyDailyLog({
          data: {
            plan: content,
            achievements: '',
            interval: 'daily',
            created_at: selectedDate
          }
        })
      }
    },
    [updateMyDailyLog, createMyDailyLog, myDailyLog, selectedDate]
  )

  useEffect(() => getMyDailyLog(), [getMyDailyLog])
  return (
    <MyLogLayout
      interval="daily"
      actions={
        <Grid item className={classes.actions}>
          <DatePicker margin="normal" label="Choose a date" value={selectedDate} onChange={handleDateChange} />
          <Button margin="normal" variant="outlined" color="primary" onClick={viewTodayLog}>
            Today
          </Button>
        </Grid>
      }>
      <Grid item xs={6}>
        <LogCard title="Plan" content={myDailyLog?.plan} onSave={handleSavePlan} />
      </Grid>
      <Grid item xs={6}>
        <LogCard title="Achievements" content={myDailyLog?.achievements} onSave={handleSaveAchievements} />
      </Grid>
    </MyLogLayout>
  )
}

const actions = {
  getMyDailyLog,
  createMyDailyLog,
  updateMyDailyLog
}

const selectors = createStructuredSelector({
  myDailyLog: myDailylogSelector
})

MyDailyLog.propTypes = {
  getMyDailyLog: PropTypes.func.isRequired,
  createMyDailyLog: PropTypes.func.isRequired,
  updateMyDailyLog: PropTypes.func.isRequired,
  myDailyLog: MyLogType,
  location: PropTypes.object,
  history: PropTypes.object
}

export default connect(selectors, actions)(withRouter(MyDailyLog))