import React from 'react'
import { TextField, FormLabel } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './styles'

const FormInput = ({ type, field, form, htmlId, label, readOnly }) => {
  let classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <FormLabel htmlFor={htmlId}> {label} </FormLabel>
      <TextField
        id={htmlId}
        margin="normal"
        type={type}
        variant="outlined"
        fullWidth
        className={classes.textField}
        inputProps={
          readOnly
            ? {
                readOnly: true
              }
            : {}
        }
        {...field}
      />
    </div>
  )
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  htmlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default FormInput
