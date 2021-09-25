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
    margin: theme.spacing.unit,
    minWidth: 40,
    textAlign: 'center'
  },
  userSelect: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  selectComponent: {
    width: '100%'
  },
  datePick: {
    padding: theme.spacing(3)
  }
}))
