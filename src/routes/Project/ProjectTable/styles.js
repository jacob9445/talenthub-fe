import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff'
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff'
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff'
  },
  tableRow: {
    cursor: 'pointer'
  }
}))
