import React, { useEffect, useCallback, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { format } from 'date-fns'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import PropTypes from 'prop-types'

import LogCard from 'routes/Shared/MyLogs/components/LogCard'
import MyLogLayout from 'routes/Shared/MyLogs/components/MyLogLayout'
import useStyles from './styles'
import { getMyMonthlyLog, createMyMonthlyLog, updateMyMonthlyLog, myMonthlyLogSelector } from 'store/modules/mylogs'
import { parseQueryString, jsonToQueryString, generateDecrementArray, generateIncrementArray } from 'helpers/utils'
import { MyLogType } from 'helpers/prop-types'

const MyMonthlyLog = ({ getMyMonthlyLog, createMyMonthlyLog, updateMyMonthlyLog, myMonthlyLog, location, history }) => {
  const classes = useStyles()
  const queryObj = useMemo(() => parseQueryString(location.search), [location])
  const selectedYear = parseInt(queryObj.year) || new Date().getFullYear()
  const selectedMonth = parseInt(queryObj.month) || new Date().getMonth() + 1
  const handleYearChange = useCallback(
    e => {
      getMyMonthlyLog({
        year: e.target.value,
        month: selectedMonth
      })

      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          year: e.target.value,
          month: selectedMonth
        })
      })
    },
    [history, location, getMyMonthlyLog, selectedMonth]
  )
  const handleMonthChange = useCallback(
    e => {
      getMyMonthlyLog({
        year: selectedYear,
        month: e.target.value
      })

      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          year: selectedYear,
          month: e.target.value
        })
      })
    },
    [history, location, selectedYear, getMyMonthlyLog]
  )

  const viewThisMonthLog = useCallback(() => {
    const date = new Date()
    getMyMonthlyLog({
      year: date.getFullYear(),
      month: date.getMonth() + 1
    })
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year: date.getFullYear(),
        month: date.getMonth() + 1
      })
    })
  }, [history, location, getMyMonthlyLog])

  const viewPrevMonthLog = useCallback(() => {
    const year = selectedMonth > 1 ? selectedYear : selectedYear - 1
    const month = selectedMonth > 1 ? selectedMonth - 1 : 12

    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year,
        month
      })
    })
  }, [history, location, selectedMonth, selectedYear])

  const viewNextMonthLog = useCallback(() => {
    const year = selectedMonth < 12 ? selectedYear : selectedYear + 1
    const month = selectedMonth < 12 ? selectedMonth + 1 : 1

    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year,
        month
      })
    })
  }, [history, location, selectedMonth, selectedYear])

  const handleSaveAchievements = useCallback(
    content => {
      if (myMonthlyLog?.id) {
        updateMyMonthlyLog({
          id: myMonthlyLog.id,
          data: {
            achievements: content
          }
        })
      } else {
        const date = new Date(selectedYear, selectedMonth - 1, 1)
        createMyMonthlyLog({
          data: {
            plan: '',
            achievements: content,
            interval: 'monthly',
            created_at: format(date, 'yyyy-MM-dd')
          }
        })
      }
    },
    [updateMyMonthlyLog, createMyMonthlyLog, myMonthlyLog, selectedYear, selectedMonth]
  )

  const handleSavePlan = useCallback(
    content => {
      if (myMonthlyLog?.id) {
        updateMyMonthlyLog({
          id: myMonthlyLog.id,
          data: {
            plan: content
          }
        })
      } else {
        const date = new Date(selectedYear, selectedMonth - 1, 1)
        createMyMonthlyLog({
          data: {
            plan: content,
            achievements: '',
            interval: 'monthly',
            created_at: format(date, 'yyyy-MM-dd')
          }
        })
      }
    },
    [updateMyMonthlyLog, createMyMonthlyLog, myMonthlyLog, selectedYear, selectedMonth]
  )

  useEffect(() => getMyMonthlyLog({ year: selectedYear, month: selectedMonth }), [
    getMyMonthlyLog,
    selectedYear,
    selectedMonth
  ])

  const yearArray = generateDecrementArray(new Date().getFullYear(), 10)
  const monthArray = generateIncrementArray(1, 12)

  return (
    <MyLogLayout
      interval="monthly"
      actions={
        <div className={classes.container}>
          <Grid item className={classes.item}>
            <Button variant="outlined" color="primary" onClick={viewPrevMonthLog}>
              <NavigateBefore />
            </Button>
          </Grid>
          <Grid className={classes.selectMonth}>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="year">Year</InputLabel>
                <Select value={selectedYear} onChange={handleYearChange} input={<Input id="year" />}>
                  {yearArray.map((year, idx) => (
                    <MenuItem value={year} key={idx}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="month">Month</InputLabel>
                <Select value={selectedMonth} onChange={handleMonthChange} input={<Input id="month" />}>
                  {monthArray.map((month, idx) => (
                    <MenuItem value={month} key={idx}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </Grid>
          <Grid item className={classes.item}>
            <Button variant="outlined" color="primary" onClick={viewNextMonthLog}>
              <NavigateNext />
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} onClick={viewThisMonthLog} variant="outlined" color="primary">
              THIS MONTH
            </Button>
          </Grid>
        </div>
      }>
      <Grid item xs={6}>
        <LogCard title="Plan" content={myMonthlyLog?.plan} onSave={handleSavePlan} />
      </Grid>
      <Grid item xs={6}>
        <LogCard title="Achievements" content={myMonthlyLog?.achievements} onSave={handleSaveAchievements} />
      </Grid>
    </MyLogLayout>
  )
}

const actions = {
  getMyMonthlyLog,
  createMyMonthlyLog,
  updateMyMonthlyLog
}

const selectors = createStructuredSelector({
  myMonthlyLog: myMonthlyLogSelector
})

MyMonthlyLog.propTypes = {
  getMyMonthlyLog: PropTypes.func.isRequired,
  createMyMonthlyLog: PropTypes.func.isRequired,
  updateMyMonthlyLog: PropTypes.func.isRequired,
  myMonthlyLog: MyLogType,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(selectors, actions)(withRouter(MyMonthlyLog))
