import React, { useCallback } from 'react'
import { FormLabel, FormHelperText } from '@material-ui/core'
import * as R from 'ramda'
import cn from 'classnames'

import EditableSelect from 'components/EditableSelect'
import { useStyles } from './styles'

const FormEditableSelect = props => {
  const { label, htmlId, field, form, className, ...selectProps } = props
  const error = R.path(R.split('.', field.name), form.touched) && R.path(R.split('.', field.name), form.errors)
  const classes = useStyles()

  const handleChange = useCallback(value => form.setFieldValue(field.name, value), [form, field.name])

  const handleBlur = useCallback(() => form.setFieldTouched(field.name, true), [form, field.name])

  return (
    <div className={cn(classes.wrapper, className)}>
      {label && <FormLabel htmlFor={htmlId}>{label}</FormLabel>}
      <EditableSelect
        {...selectProps}
        value={field.value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(error)}
      />
      <FormHelperText className={classes.helperText} error={Boolean(error)}>
        {error}
      </FormHelperText>
    </div>
  )
}

export default FormEditableSelect
