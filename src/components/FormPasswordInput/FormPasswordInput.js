import React, { useState } from 'react'
import { TextField, FormLabel } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './styles'
import cn from 'classnames'
import * as R from 'ramda'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'

const FormPasswordInput = ({ field, form, field: { name }, htmlId, noMb, label }) => {
  const classes = useStyles()
  const error = R.path(R.split('.', name), form.touched) && R.path(R.split('.', name), form.errors)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn(classes.wrapper, { [classes.noMb]: noMb })}>
      {label && (
        <FormLabel className={classes.formLabel} htmlFor={htmlId}>
          {label}
        </FormLabel>
      )}
      <TextField
        id={htmlId}
        className={classes.textField}
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        label={label}
        helperText={error || undefined}
        error={Boolean(error)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...field}
      />
    </div>
  )
}

FormPasswordInput.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  htmlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default FormPasswordInput
