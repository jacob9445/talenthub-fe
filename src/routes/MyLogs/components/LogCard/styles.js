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
  typography: {
    marginBottom: theme.spacing(2),
    whiteSpace: 'pre-wrap'
  },
  textField: {
    width: '100%'
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}))
