import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  list: {
    width: 350
  },
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  notificationBody: {
    padding: 10
  },
  nothing: {
    opacity: 0.7
  }
}))
