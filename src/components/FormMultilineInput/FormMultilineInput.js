import React from 'react'
import * as R from 'ramda'
import { TextField, FormLabel } from '@material-ui/core'
import PropTypes from 'prop-types'
import cn from 'classnames'

import useStyles from './styles'

const FormMultilineInput = ({ type, field, form, field: { name }, htmlId, label, noMb }) => {
  const classes = useStyles()
  const error = R.path(R.split('.', name), form.touched) && R.path(R.split('.', name), form.errors)

  return (
    <div className={cn(classes.wrapper, { [classes.noMb]: noMb })}>
      {label && <FormLabel htmlFor={htmlId}>{label}</FormLabel>}
      <TextField
        id={htmlId}
        type={type}
        multiline
        rowsMax="4"
        margin="none"
        fullWidth
        variant="outlined"
        helperText={error || undefined}
        error={Boolean(error)}
        {...field}
      />
    </div>
  )
}

FormMultilineInput.propTypes = {
  type: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  htmlId: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default FormMultilineInput
