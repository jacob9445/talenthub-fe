import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[5]
  },
  cardContent: {
    flex: 1
  },
  cardActions: {
    justifyContent: 'flex-end'
  },
  head: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    width: 580,
    minHeight: 100
  }
}))
