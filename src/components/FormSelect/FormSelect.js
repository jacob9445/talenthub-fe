import React from 'react'
import { FormControl, FormLabel, Select, OutlinedInput, MenuItem, FormHelperText } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './style'
import cn from 'classnames'
import * as R from 'ramda'

const FormSelect = ({ field, form, field: { name }, htmlId, label, options, noMb }) => {
  const classes = useStyles()
  const error = R.path(R.split('.', name), form.touched) && R.path(R.split('.', name), form.errors)

  return (
    <FormControl
      variant="outlined"
      className={cn(classes.formControl, {
        [classes.noMb]: noMb
      })}>
      {label && <FormLabel htmlFor={htmlId}>{label}</FormLabel>}
      <Select
        input={<OutlinedInput labelWidth={0} id={htmlId} name={field.name} />}
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value || ''}>
        {options.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.display}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={Boolean(error)}>{error}</FormHelperText>
    </FormControl>
  )
}

FormSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  htmlId: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  noMb: PropTypes.bool
}

export default FormSelect
