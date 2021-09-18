import React from 'react'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'

const LoggingActionBar = ({ fullName }) => {
  return (
    <Widget title="Full Name" disableWidgetButton disableWidgetMenu>
      <Typography>{fullName}</Typography>
    </Widget>
  )
}

LoggingActionBar.propTypes = {
  fullName: PropTypes.string
}

export default LoggingActionBar
