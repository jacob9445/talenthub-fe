import React from 'react'
import { Button, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

import LogCard from 'routes/Shared/MyLogs/components/LogCard'
import LoggingActionBar from 'routes/Shared/Logging/components/LoggingActionBar'
import useStyles from './styles'
import { getFullName } from 'helpers/utils'

const LogDetail = ({ logDetail, onGoBack, editable }) => {
  let classes = useStyles()
  const fullName = logDetail ? getFullName(logDetail.owner) : ''

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LoggingActionBar fullName={fullName} />
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
