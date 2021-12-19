import { format } from 'date-fns'
import { getFirstDateOfWeek, getWeekOfMonth } from 'helpers/utils'

export const generateDate = (year, month, week, day) => {
  let dt
  if (week) return getFirstDateOfWeek(year, parseInt(week) + 1)
  else if (month && day) dt = new Date(year, parseInt(month) - 1, day)
  else dt = new Date(year, parseInt(month) - 1, 1)
  return format(dt, 'yyyy-MM-dd')
}

export const getDate = (date, year, month, week, day) => {
  if (date) return date
  else if (year) return generateDate(year, month, week, day)
  else return format(new Date(), 'yyyy-MM-dd')
}

export const datePickerLabelFunc = (selectedDate, invalidLabel) => {
  const weekOfMonth = getWeekOfMonth(selectedDate)
  return `Week #${weekOfMonth} of ${format(selectedDate, 'MMM.yyyy')}`
}

export const shouldRedirect = (logDetail, year, month, week, day, userId) => {
  if (logDetail.owner.id === parseInt(userId) && logDetail.created_at === generateDate(year, month, week, day))
    return true
  else return false
}
