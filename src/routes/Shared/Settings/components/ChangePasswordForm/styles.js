import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  buttonWraper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(4)
  },
  saveButton: {
    marginRight: theme.spacing(2)
  }
}))
