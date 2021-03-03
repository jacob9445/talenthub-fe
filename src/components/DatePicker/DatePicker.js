import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

import useStyles from './styles'

function DatePickers({ label, onChange, id }) {
  const classes = useStyles()

  return (
    <TextField
      id={id}
      label={label}
      type="date"
      defaultValue="0000-00-00"
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
      onChange={onChange}
    />
  )
}

DatePickers.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default DatePickers
