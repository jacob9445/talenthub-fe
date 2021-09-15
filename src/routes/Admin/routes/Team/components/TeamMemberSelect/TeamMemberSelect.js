import React, { useMemo, useCallback } from 'react'
import { TextField, Paper, MenuItem, IconButton, Chip } from '@material-ui/core'
import { AccountCircle as FaceIcon, Cancel as CancelIcon, ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'
import cn from 'classnames'
import { connect } from 'react-redux'
import Select from 'react-select'
import { show } from 'redux-modal'
import PropTypes from 'prop-types'
import { useStyles } from './styles'

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />

const Control = props => (
  <TextField
    multiline
    fullWidth
    variant="standard"
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

const Option = props => (
  <MenuItem buttonRef={props.innerRef} selected={props.isFocused} component="div" {...props.innerProps}>
    {props.children}
  </MenuItem>
)

const MultiValue = props => {
  const { show } = props.selectProps || {}

  const handleRemove = useCallback(
    props => {
      show('confirmModal', {
        confirmation: 'Are you sure to exclude him from team?',
        proceed: () => props.removeProps.onClick()
      })
    },
    [show]
  )

  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={cn(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      key={props.data.value}
      color="primary"
      variant="outlined"
      icon={<FaceIcon />}
      onDelete={() => handleRemove(props)}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  )
}

const ValueContainer = props => <div className={props.selectProps.classes.valueContainer}>{props.children}</div>

const DropdownIndicator = props => (
  <IconButton className={props.selectProps.classes.DropdownIndicator} {...props.innerProps}>
    <ArrowDropDownIcon />
  </IconButton>
)

const TeamMemberSelect = ({ show, onClick, onDelete, options, defaultOptions, ...selectProps }) => {
  const classes = useStyles()

  const unassigedUserOptions = useMemo(
    () =>
      options
        ? options.map(userItem => ({
            value: userItem.id,
            label: `${userItem.first_name} ${userItem.last_name}`
          }))
        : [],
    [options]
  )

  const currentMemberOptions = useMemo(
    () =>
      defaultOptions
        ? defaultOptions.map(userItem => ({
            value: userItem.id,
            label: `${userItem.first_name} ${userItem.last_name}`
          }))
        : [],
    [defaultOptions]
  )

  const handleChange = useCallback(
    (newVal, meta) => {
      if (meta.action === 'select-option') {
        onClick(meta.option.value)
      }
      if (meta.action === 'remove-value') {
        onDelete(meta.removedValue.value)
      }
    },
    [onClick, onDelete]
  )

  return (
    <div className={classes.wrapper}>
      <Select
        {...selectProps}
        textFieldProps={{
          InputLabelProps: {
            shrink: true
          }
        }}
        defaultValue={currentMemberOptions}
        options={unassigedUserOptions}
        classes={classes}
        show={show}
        onChange={handleChange}
      />
    </div>
  )
}

TeamMemberSelect.defaultProps = {
  isClearable: false,
  isMulti: true,
  backspaceRemovesValue: false,
  placeholder: 'Choose developers ...',
  noOptionsMessage: () => 'No unassigned developers',
  components: {
    Control,
    Menu,
    Option,
    MultiValue,
    ValueContainer,
    DropdownIndicator
  }
}

const actions = {
  show
}

TeamMemberSelect.propTypes = {
  show: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultOptions: PropTypes.arrayOf(PropTypes.object),
  selectProps: PropTypes.object
}

export default connect(null, actions)(TeamMemberSelect)
