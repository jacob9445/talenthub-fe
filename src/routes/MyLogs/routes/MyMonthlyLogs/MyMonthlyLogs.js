import React, { useEffect, useCallback } from 'react'
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
import PropTypes from 'prop-types'

import LogCard from 'routes/MyLogs/components/LogCard'
import MyLogLayout from 'routes/MyLogs/components/MyLogLayout'
import useStyles from './styles'
import { getMyMonthlyLog, createMyMonthlyLog, updateMyMonthlyLog, myMonthlyLogSelector } from 'store/modules/mylogs'
import { parseQueryString, jsonToQueryString, generateDecrementArray, generateIncrementArray } from 'helpers/utils'
import { MyLogType } from 'helpers/prop-types'

const MyMonthlyLog = ({ getMyMonthlyLog, createMyMonthlyLog, updateMyMonthlyLog, myMonthlyLog, location, history }) => {
  const classes = useStyles()
  const queryObj = parseQueryString(location.search)
  const selectedYear = queryObj.year || new Date().getFullYear()
  const selectedMonth = queryObj.month || new Date().getMonth() + 1
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

  useEffect(() => getMyMonthlyLog(), [getMyMonthlyLog])

  const yearArray = generateDecrementArray(new Date().getFullYear(), 10)
  const monthArray = generateIncrementArray(1, 12)

  return (
    <MyLogLayout
      interval="monthly"
      actions={
        <Grid className={classes.selectMonth}>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="year">Year</InputLabel>
              <Select value={selectedYear} onChange={handleYearChange} input={<Input id="year" />}>
                {yearArray.map(year => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="month">Month</InputLabel>
              <Select value={selectedMonth} onChange={handleMonthChange} input={<Input id="month" />}>
                {monthArray.map(month => (
                  <MenuItem value={month}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <Button className={classes.button} onClick={viewThisMonthLog} variant="outlined" color="primary">
            THIS MONTH
          </Button>
        </Grid>
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
