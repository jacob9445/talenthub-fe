import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noItems: {
    padding: theme.spacing(4)
  }
}))
