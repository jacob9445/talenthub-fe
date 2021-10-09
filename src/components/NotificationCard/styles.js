import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  cancelIcon: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: 5
  },
  card: {
    position: 'relative',
    marginBottom: theme.spacing(1.5)
  },
  content: {
    paddingTop: theme.spacing(1) / 2,
    paddingBottom: theme.spacing(1) / 2
  }
}))
