import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import LogCard from 'routes/Shared/MyLogs/components/LogCard'

import Spinner from 'components/Spinner'
import useStyles from './styles'
import { ListDataType } from 'helpers/prop-types'

const LogsTable = ({ data }) => {
  const classes = useStyles()

  if (data) {
    return (
      <>
        {data.map(({ plan, achievements, created_at }) => (
          <div className={classes.topSpace}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>{format(new Date(created_at), 'eeee')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <LogCard content={plan} editable={false} />
              </Grid>
              <Grid item xs={6}>
                <LogCard content={achievements} editable={false} />
              </Grid>
            </Grid>
          </div>
        ))}
      </>
    )
  } else {
    return <Spinner />
  }
}

LogsTable.propTypes = {
  data: ListDataType
}

export default LogsTable
