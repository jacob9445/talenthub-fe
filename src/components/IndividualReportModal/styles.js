import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  noItems: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  paper: {
    minWidth: 360
  }
}))
