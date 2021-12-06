import { format } from 'date-fns'
import { getFirstDateOfWeek, getWeekOfMonth } from 'helpers/utils'

export const generateDate = (year, month, week, day) => {
  if (week) return getFirstDateOfWeek(year, parseInt(week) + 1)
  else if (month && day) return new Date(year, parseInt(month) - 1, day)
  else return new Date(year, parseInt(month) - 1, 1)
}

export const getDate = (date, year, month, week, day) => {
  if (date) return date
  else if (year) return format(generateDate(year, month, week, day), 'yyyy-MM-dd')
  else return format(new Date(), 'yyyy-MM-dd')
}

export const datePickerLabelFunc = (selectedDate, invalidLabel) => {
  const weekOfMonth = getWeekOfMonth(selectedDate)
  return `Week #${weekOfMonth} of ${format(selectedDate, 'MMM.yyyy')}`
}

export const shouldRedirect = (logDetail, year, month, week, day, userId) => {
  if (
    logDetail.owner.id === parseInt(userId) &&
    logDetail.created_at === format(generateDate(year, month, week, day), 'yyyy-MM-dd')
  )
    return true
  else return false
}
