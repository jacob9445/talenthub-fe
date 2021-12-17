import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const FormCheckbox = ({ label, htmlId, checked, onChange, field }) => {
  return (
    <FormControlLabel
      id={htmlId}
      control={<Checkbox checked={checked} color="primary" onChange={onChange} />}
      label={label}
      {...field}
    />
  )
}

export default FormCheckbox
