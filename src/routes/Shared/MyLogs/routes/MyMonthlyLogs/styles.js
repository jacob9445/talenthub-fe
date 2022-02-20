import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginRight: theme.spacing(4)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 40,
    textAlign: 'center'
  },
  selectMonth: {
    display: 'flex',
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: theme.spacing(3)
  },
  button: {
    maxHeight: theme.spacing(5)
  },
  item: {
    marginRight: theme.spacing(3)
  }
}))
