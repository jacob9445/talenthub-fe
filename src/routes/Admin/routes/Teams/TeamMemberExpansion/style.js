import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme =>({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  chip: {
    margin: theme.spacing(1) / 2
  }
}))