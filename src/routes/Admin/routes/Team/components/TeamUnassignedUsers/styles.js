import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(1) / 2
  },
  noValueMessage: {
    marginLeft: theme.spacing(1)
  }
}))
