import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { FormattedNumber } from 'react-intl'
import useStyles from './styles'

function StatCard({ title, amount }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h2" component="h2" className={classes.content}>
          <FormattedNumber format="currency" value={amount} />
        </Typography>
      </CardContent>
    </Card>
  )
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
}

export default StatCard
