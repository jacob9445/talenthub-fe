import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: theme.spacing(4)
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 40,
    textAlign: 'center'
  },
  selectMonth: {
    display: 'flex',
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    maxHeight: theme.spacing(5)
  }
}))
