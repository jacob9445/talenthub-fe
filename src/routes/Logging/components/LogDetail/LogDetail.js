import React from 'react'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

const LogDetail = ({ logDetail, onGoBack, editable }) => {
  console.log({ logDetail })
  let classes = useStyles()
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} className={classes.cardBlock}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2" className={classes.head}>
                Plan
              </Typography>
              <Typography component="pre" className={classes.textContent}>
                {logDetail && `${logDetail.plan}`}
              </Typography>
            </CardContent>
            {editable && (
              <CardActions className={classes.cardActions}>
                <Button variant="text" color="primary">
                  Edit
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>
        <Grid item xs={6} className={classes.cardBlock}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2" className={classes.head}>
                Achievements
              </Typography>
              <Typography component="pre" className={classes.textContent}>
                {logDetail && `${logDetail.achievements}`}
              </Typography>
            </CardContent>
            {editable && (
              <CardActions className={classes.cardActions}>
                <Button variant="text" color="primary">
                  Edit
                </Button>
              </CardActions>
            )}
          </Card>
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
