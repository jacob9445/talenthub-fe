import React from 'react'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

import LogCard from 'routes/Shared/MyLogs/components/LogCard'
import LoggingActionBar from 'routes/Shared/Logging/components/LoggingActionBar'
import useStyles from './styles'

const LogDetail = ({ logDetail, onGoBack, editable, interval }) => {
  let classes = useStyles()
  return (
    <>
      <Paper className={classes.navs}>
        <Typography variant="h3">This Week's Plan</Typography>
        <Button variant="contained" color="primary" onClick={onGoBack}>
          Go back
        </Button>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LoggingActionBar logDetail={logDetail} interval={interval} />
        </Grid>
        <Grid item xs={6}>
          <LogCard title="Plan" content={logDetail?.plan} editable={false} />
        </Grid>
        <Grid item xs={6}>
          <LogCard title="Achievements" content={logDetail?.achievements} editable={false} />
        </Grid>
      </Grid>

      <div className={classes.navs}>
        <Button variant="contained" color="primary" onClick={onGoBack}>
          Go back
        </Button>
      </div>
    </>
  )
}

LogDetail.propTypes = {
  logDetail: PropTypes.object,
  onGoBack: PropTypes.func.isRequired,
  editable: PropTypes.bool
}

export default LogDetail
