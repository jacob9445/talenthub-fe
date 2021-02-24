import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  wrapper: {
    marginBottom: theme.spacing(2)
  },
  noMb: {
    marginBottom: `0 !important`
  }
}))
