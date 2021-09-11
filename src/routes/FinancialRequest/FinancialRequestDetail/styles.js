import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  cancelButton: {
    float: 'right'
  },
  approveButton: {
    marginRight: theme.spacing(2)
  },
  row: {
    marginBottom: theme.spacing(1)
  },
  hrline: {
    backgroundColor: theme.palette.grey[500],
    height: 2,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}))
