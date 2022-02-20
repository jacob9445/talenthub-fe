import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Paper } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import SimpleSelect from 'components/SimpleSelect'
import PeriodButtonGroup from 'components/PeriodButtonGroup'
import { LOG_OPTIONS, URL_PREFIXES } from 'config/constants'
import useStyles from './styles'
import { meSelector } from 'store/modules/auth'
import PropTypes from 'prop-types'

const MyLogLayout = ({ history, interval, location, actions, children, me }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <Grid container className={classes.toolbar} alignItems="center">
            <Grid item>
              <PeriodButtonGroup me={me} selectedPeriod={interval} />
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

MyLogLayout.propTypes = {
  interval: PropTypes.string.isRequired,
  actions: PropTypes.element.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
  me: PropTypes.object.isRequired,
  history: PropTypes.object,
  location: PropTypes.object
}

export default connect(selectors)(withRouter(MyLogLayout))
