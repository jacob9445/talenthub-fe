import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import LogCard from 'routes/Shared/MyLogs/components/LogCard'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import { getWeekOfMonth } from 'helpers/utils'
import { none } from 'ramda'

const LogList = ({ data, interval }) => {
  const classes = useStyles()

  const getWeekLabel = dateString => {
    const date = new Date(dateString)
    const weekOfMonth = getWeekOfMonth(date)
    return `Week #${weekOfMonth} of ${format(date, 'MMM. yyyy')}`
  }

  if (data) {
    return (
      <>
        {data.map(({ plan, achievements, created_at }, id) => (
          <div className={classes.topSpace} key={id}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {interval === 'monthly' ? (
                  <Typography>{getWeekLabel(created_at)}</Typography>
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

LogList.propTypes = {
  data: PropTypes.array.isRequired,
  interval: PropTypes.string.isRequired
}

export default LogList
