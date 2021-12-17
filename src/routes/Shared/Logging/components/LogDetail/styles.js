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
  navs: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  textContent: {
    whiteSpace: 'pre-wrap'
  }
}))
