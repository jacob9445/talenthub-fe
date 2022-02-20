import React, { useEffect, useCallback, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import { format } from 'date-fns'

import LogCard from 'routes/Shared/MyLogs/components/LogCard'
import LocalizedDatePicker from 'components/LocalizedDatePicker'
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

  const oneDayPeriod = 86400000
  const previousDateOfSelectedDate = useMemo(() => new Date(new Date(selectedDate).getTime() - oneDayPeriod), [
    selectedDate
  ])
  const nextDateofSelectedDate = useMemo(() => new Date(new Date(selectedDate).getTime() + oneDayPeriod), [
    selectedDate
  ])

  const handleDateChange = useCallback(
    date => {
      getMyDailyLog({
        date
      })

      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          date
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

  const viewPrevDayLog = useCallback(() => {
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        date: format(previousDateOfSelectedDate, 'yyyy-MM-dd')
      })
    })
  }, [history, location, previousDateOfSelectedDate])

  const viewNextDayLog = useCallback(() => {
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        date: format(nextDateofSelectedDate, 'yyyy-MM-dd')
      })
    })
  }, [history, location, nextDateofSelectedDate])

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

  useEffect(() => {
    getMyDailyLog({
      date: selectedDate
    })
  }, [getMyDailyLog, selectedDate])
  return (
    <MyLogLayout
      interval="daily"
      actions={
        <div className={classes.actions}>
          <Grid item xs={3}>
            <Button variant="outlined" color="primary" onClick={viewPrevDayLog}>
              <NavigateBefore />
            </Button>
          </Grid>
          <Grid item xs={3} className={classes.select}>
            <LocalizedDatePicker
              margin="normal"
              label="Choose a date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" color="primary" onClick={viewNextDayLog}>
              <NavigateNext />
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button margin="normal" variant="outlined" color="primary" onClick={viewTodayLog}>
              Today
            </Button>
          </Grid>
        </div>
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
