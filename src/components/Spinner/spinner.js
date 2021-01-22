import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'

const styles = theme => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing(2)
  }
})

function Spinner({ classes }) {
  return (
    <div className={classes.wrapper}>
      <CircularProgress size="5rem" className={classes.progress} />
    </div>
  )
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Spinner)
