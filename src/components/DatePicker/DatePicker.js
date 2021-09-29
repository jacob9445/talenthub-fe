import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

import useStyles from './styles'

function DatePickers({ label, onChange, id, value }) {
  const classes = useStyles()

  return (
    <TextField
      id={id}
      label={label}
      type="date"
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
      value={value}
      onChange={onChange}
    />
  )
}

DatePickers.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default DatePickers
