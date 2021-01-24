import React from 'react'
import PropTypes from 'prop-types'

// styles
import useStyles from './styles'

// components
import { Typography } from '../Wrappers'

export default function PageTitle(props) {
  // console.log({props})
  var classes = useStyles()

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  )
}

PageTitle.propTypes = {
}
