import React, { useState } from 'react'
import { TextField, Paper, Typography, MenuItem, IconButton } from '@material-ui/core'
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
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400
    }}
    {...props.innerProps}>
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
  <IconButton {...props.innerProps}>
    <CancelIcon />
  </IconButton>
)

const DropdownIndicator = props => (
  <IconButton {...props.innerProps}>
    <ArrowDropDownIcon />
  </IconButton>
)

const FormEditableSelect = props => {
  const classes = useStyles()
  const [value, setValue] = useState(null)
  console.log({ props })
  return (
    <div className={classes.root}>
      <Select
        value={value}
        onChange={v => setValue(v)}
        textFieldProps={{
          label: props.label,
          InputLabelProps: {
            shrink: true
          }
        }}
        {...{ ...props, classes }}
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
