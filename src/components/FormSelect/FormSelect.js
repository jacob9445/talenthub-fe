import React, { createRef } from 'react'
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem} from '@material-ui/core'
import useStyles from './style'
const FormSelect = ({field, form, htmlId, label, options}) => {
  const classes = useStyles()
  
  const ref = createRef()

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel
        htmlFor={htmlId}
      >
        {label}
      </InputLabel>
      <Select
        
        className={classes.formSelect}
        input={
          <OutlinedInput
            inputRef={ref}
            labelWidth={0}
            id={htmlId}
            name={field.name}
          />
        }
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value || ''}
      >
        {
          options.map(item => (<MenuItem key={item.value} value={item.value}>{item.display}</MenuItem>))
        }
      </Select>
    </FormControl>
  )
}

export default FormSelect