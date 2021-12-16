import React, { useCallback } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { format } from 'date-fns'
import { dateStringToLocalDate } from 'helpers/utils'

const LocalizedDatePicker = ({ value, onChange, ...props }) => {
  const localizedDate = value ? dateStringToLocalDate(value) : new Date()
  const handleChange = useCallback(
    date => {
      onChange(format(date, 'yyyy-MM-dd'))
    },
    [onChange]
  )

  return <DatePicker {...props} value={localizedDate} onChange={handleChange} />
}

export default LocalizedDatePicker
