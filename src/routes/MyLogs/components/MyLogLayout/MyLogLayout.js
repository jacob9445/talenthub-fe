import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Paper } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import SimpleSelect from 'components/SimpleSelect'
import { LOG_OPTIONS, URL_PREFIXES } from 'config/constants'
import useStyles from './styles'
import { meSelector } from 'store/modules/auth'

const MyLogLayout = ({ history, interval, location, actions, children, me }) => {
  const handleLogChange = useCallback(
    event => {
      const interval = event.target.value
      history.push(`${URL_PREFIXES[me.role]}/my-logs/${interval}`)
    },
    [history, me.role]
  )
  const classes = useStyles()
  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <Grid container className={classes.toolbar} alignItems="center">
            <Grid item>
              <SimpleSelect label="Logs" defaultValue={interval} options={LOG_OPTIONS} onChange={handleLogChange} />
            </Grid>
            {actions}
          </Grid>
        </Paper>
      </Grid>
      {children}
    </Grid>
  )
}

const selectors = createStructuredSelector({
  me: meSelector
})

export default connect(selectors)(withRouter(MyLogLayout))
