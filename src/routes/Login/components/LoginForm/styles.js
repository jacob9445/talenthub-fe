import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  greeting: {
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  formButtons: {
    width: '100%',
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  forgetButton: {
    textTransform: 'none',
    fontWeight: 400
  }
}))
