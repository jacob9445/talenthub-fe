import React, { useCallback } from 'react'
import { FormHelperText } from '@material-ui/core'
import * as R from 'ramda'

import useStyles from './styles'
import LocalizedDatePicker from 'components/LocalizedDatePicker'

const FormDatePicker = props => {
  const { label, field, form, ...pickerProps } = props
  const classes = useStyles()
  const error = R.path(R.split('.', field.name), form.touched) && R.path(R.split('.', field.name), form.errors)
  const handleChange = useCallback(date => form.setFieldValue(field.name, date), [form, field.name])
  const handleBlur = useCallback(() => form.setFieldTouched(field.name, true), [form, field.name])
  return (
    <div>
      <LocalizedDatePicker
        {...pickerProps}
        value={field.value}
        onChange={handleChange}
        onBlur={handleBlur}
        label={label}
      />
      <FormHelperText className={classes.helperText} error={Boolean(error)}>
        {error}
      </FormHelperText>
    </div>
  )
}

export default FormDatePicker
