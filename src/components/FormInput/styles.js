import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  textFieldUnderline: {
    '&:before': {
      borderBottomColor: theme.palette.primary.light
    },
    '&:after': {
      borderBottomColor: theme.palette.primary.main
    },
    '&:hover:before': {
      borderBottomColor: `${theme.palette.primary.light} !important`
    }
  },
  wrapper: {
    marginBottom: theme.spacing(2)
  },
  noMb: {
    marginBottom: `0 !important`
  }
}))
