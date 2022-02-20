import { useCallback } from 'react'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'

import { URL_PREFIXES } from 'config/constants'
import useStyles from './styles'

const PeriodButtonGroup = ({ selectedPeriod, history, me, loggingOrMyLogs }) => {
  const classes = useStyles()
  const handlePeriodChange = useCallback(
    interval => {
      history.push(`/${URL_PREFIXES[me.role]}/${loggingOrMyLogs}/${interval}`)
    },
    [history, me.role, loggingOrMyLogs]
  )
  return (
    <div className={classes.container}>
      <Button
        variant={selectedPeriod === 'daily' ? 'contained' : 'outlined'}
        color="primary"
        size="large"
        onClick={() => handlePeriodChange('daily')}>
        Daily
      </Button>
      <Button
        variant={selectedPeriod === 'weekly' ? 'contained' : 'outlined'}
        color="primary"
        size="large"
        onClick={() => handlePeriodChange('weekly')}>
        Weekly
      </Button>
      <Button
        variant={selectedPeriod === 'monthly' ? 'contained' : 'outlined'}
        color="primary"
        size="large"
        onClick={() => handlePeriodChange('monthly')}>
        Monthly
      </Button>
    </div>
  )
}

export default withRouter(PeriodButtonGroup)
