import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import PropTypes from 'prop-types'

import useStyles from './style'

const SimpleSelect = ({ options, label, onChange, defaultValue, value }) => {
  const classes = useStyles()
  const [labelWidth, setLabelWidth] = useState(0)
  const inputLabelRef = useRef(null)

  useEffect(() => {
    if (inputLabelRef.current) setLabelWidth(ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth)
  }, [inputLabelRef])

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabelRef} htmlFor="outlined-simple">
        {label}
      </InputLabel>
      <Select
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        input={<OutlinedInput labelWidth={labelWidth} name="select" id="outlined-simple" />}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

SimpleSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string
}

export default SimpleSelect
