import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  link: {
    textDecoration: 'None',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))
