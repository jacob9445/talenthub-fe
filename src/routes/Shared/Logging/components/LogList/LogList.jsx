import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import LogCard from 'routes/Shared/MyLogs/components/LogCard'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import { none } from 'ramda'

const weekArray = ['First', 'Second', 'Third', 'Fourth', 'Fifth']

const LogsTable = ({ data, interval }) => {
  const classes = useStyles()

  if (data) {
    return (
      <>
        {data.map(({ plan, achievements, created_at }, id) => (
          <div className={classes.topSpace} key={id}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {interval === 'monthly' ? (
                  <Typography>{weekArray[data.length - 1 - id]} Week</Typography>
                ) : interval === 'weekly' ? (
                  <Typography>{format(new Date(created_at), 'eeee')}</Typography>
                ) : (
                  none
                )}
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
  data: PropTypes.array.isRequired,
  interval: PropTypes.string.isRequired
}

export default LogsTable
