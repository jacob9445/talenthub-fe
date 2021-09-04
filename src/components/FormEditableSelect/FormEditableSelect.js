import React from 'react'
import { TextField, Paper, Typography, MenuItem, IconButton, FormLabel } from '@material-ui/core'
import { Cancel as CancelIcon, ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'
import Select from 'react-select'
import { useStyles } from './styles'

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />

const Control = props => (
  <TextField
    fullWidth
    variant="outlined"
    InputProps={{
      inputComponent,
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps
      }
    }}
    {...props.selectProps.textFieldProps}
  />
)

const Menu = props => (
  <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>
)

const NoOptionsMessage = props => (
  <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
    {props.children}
  </Typography>
)

const Option = props => (
  <MenuItem buttonRef={props.innerRef} selected={props.isFocused} component="div" {...props.innerProps}>
    {props.children}
  </MenuItem>
)

const Placeholder = props => (
  <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
    {props.children}
  </Typography>
)

const SingleValue = props => (
  <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
    {props.children}
  </Typography>
)

const ValueContainer = props => <div className={props.selectProps.classes.valueContainer}>{props.children}</div>

const IndicatorSeparator = () => null

const ClearIndicator = props => (
  <IconButton className={props.selectProps.classes.ClearIndicator} {...props.innerProps}>
    <CancelIcon />
  </IconButton>
)

const DropdownIndicator = props => (
  <IconButton className={props.selectProps.classes.DropdownIndicator} {...props.innerProps}>
    <ArrowDropDownIcon />
  </IconButton>
)

const FormEditableSelect = props => {
  const { label, htmlId, field, form, ...selectProps } = props
  const classes = useStyles()
  const handleChange = option => {
    form.setFieldValue(field.name, option.value)
  }

  return (
    <div className={classes.wrapper}>
      {label && <FormLabel htmlFor={htmlId}>{label}</FormLabel>}
      <Select
        {...selectProps}
        value={selectProps.options.find(option => option.value === field.value) || null}
        onChange={handleChange}
        onBlur={field.onBlur}
        textFieldProps={{
          InputLabelProps: {
            shrink: true
          }
        }}
        classes={classes}
      />
    </div>
  )
}

FormEditableSelect.defaultProps = {
  isClearable: true,
  components: {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    IndicatorSeparator,
    ClearIndicator,
    DropdownIndicator
  }
}

export default FormEditableSelect
