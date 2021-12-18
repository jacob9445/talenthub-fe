import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  grid: {
    width: 'auto'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: theme.spacing(4)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 40,
    textAlign: 'center'
  },
  buttonMargin: {
    marginRight: theme.spacing(1)
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
