import React from 'react'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

import LogCard from 'routes/Shared/MyLogs/components/LogCard'
import useStyles from './styles'

const LogDetail = ({ logDetail, onGoBack, editable }) => {
  let classes = useStyles()
  return (
    <>
      <Grid container spacing={2}>
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
