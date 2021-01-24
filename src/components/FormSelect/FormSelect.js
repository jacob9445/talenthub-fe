import React from 'react'
import { FormControl, FormLabel, Select, OutlinedInput, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './style'

const FormSelect = ({ field, form, htmlId, label, options }) => {
  const classes = useStyles()

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <FormLabel htmlFor={htmlId}>{label}</FormLabel>
      <Select
        className={classes.formSelect}
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
    </FormControl>
  )
}

FormSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  htmlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
}

export default FormSelect
