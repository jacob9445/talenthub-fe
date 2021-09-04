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
  cancelIcon: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: 5
  },
  card: {
    position: 'relative'
  },
  content: {
    paddingTop: theme.spacing(1) / 2,
    paddingBottom: theme.spacing(1) / 2
  },
  link: {
    textDecoration: 'None',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  nothing: {
    opacity: 0.7
  }
}))
