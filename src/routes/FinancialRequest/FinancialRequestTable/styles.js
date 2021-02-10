import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  success: {
    color: theme.palette.success.main
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff'
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff'
  }
}))
