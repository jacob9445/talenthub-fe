import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  grid: {
    width: 'auto'
  },
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
    textAlign: 'right',
    marginTop: theme.spacing(2)
  },
  textContent: {
    whiteSpace: 'pre-wrap',
    padding: 30
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    width: 580,
    minHeight: 500
  }
}))
