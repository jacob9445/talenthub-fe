import { connect } from 'react-redux'
import { Grid, Paper } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import PeriodButtonGroup from 'components/PeriodButtonGroup'
import useStyles from './styles'
import { meSelector } from 'store/modules/auth'
import PropTypes from 'prop-types'

const MyLogLayout = ({ interval, actions, children, me }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <Grid container className={classes.toolbar} alignItems="center">
            <Grid item>
              <PeriodButtonGroup me={me} selectedPeriod={interval} loggingOrMyLogs="my-logs" />
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

export default connect(selectors)(MyLogLayout)
