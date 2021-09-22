import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import DailyLogDetail from 'routes/Shared/Logging/routes/DailyLogDetail'
import DailyLogs from 'routes/Shared/Logging/routes/DailyLogs'
import MonthlyLogs from 'routes/Shared/Logging/routes/MonthlyLogs'
import MonthlyLogDetail from 'routes/Shared/Logging/routes/MonthlyLogDetail'
import WeeklyLogs from 'routes/Shared/Logging/routes/WeeklyLogs'
import WeeklyLogDetail from 'routes/Shared/Logging/routes/WeeklyLogDetail'
import RetrieveWeeklyLog from 'routes/Shared/Logging/routes/RetrieveWeeklyLog'
import RetrieveDailyLog from 'routes/Shared/Logging/routes/RetrieveDailyLog'
import RetrieveMonthlyLog from 'routes/Shared/Logging/routes/RetrieveMonthlyLog'

const Logging = ({ match: { path }, match }) => {
  const parentPath = path.replace('/:interval?', '')
  const { interval } = match.params
  return (
    <Switch>
      <Route exact path={`${parentPath}/daily`} component={DailyLogs} />
      <Route
        exact
        path={`${parentPath}/daily/:id`}
        render={props => <DailyLogDetail {...props} interval={interval} />}
      />
      <Route exact path={`${parentPath}/monthly`} component={MonthlyLogs} />
      <Route
        exact
        path={`${parentPath}/monthly/:id`}
        render={props => <MonthlyLogDetail {...props} interval={interval} />}
      />
      <Route exact path={`${parentPath}/weekly`} component={WeeklyLogs} />
      <Route
        exact
        path={`${parentPath}/weekly/:id`}
        render={props => <WeeklyLogDetail {...props} interval={interval} />}
      />
      <Route
        exact
        path={`${parentPath}/daily/:year-:month-:day/:userId`}
        render={props => <RetrieveDailyLog {...props} interval={interval} />}
      />
      <Route
        exact
        path={`${parentPath}/weekly/:year-:week/:userId`}
        render={props => <RetrieveWeeklyLog {...props} interval={interval} />}
      />
      <Route
        exact
        path={`${parentPath}/monthly/:year-:month/:userId`}
        render={props => <RetrieveMonthlyLog {...props} interval={interval} />}
      />
      <Redirect to={`${parentPath}/daily`} />
    </Switch>
  )
}

Logging.propTypes = {
  match: PropTypes.object.isRequired
}

export default Logging
