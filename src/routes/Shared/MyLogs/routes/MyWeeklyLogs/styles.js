import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item: {
    marginRight: theme.spacing(3)
  }
}))
