import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'flex',
    padding: 18.5
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  noOptionsMessage: {
    padding: 1 //`${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 10,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 1, //theme.spacing(1),
    left: 0,
    right: 0
  }
}))
