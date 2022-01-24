import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'flex',
    paddingTop: 18.5,
    paddingDown: 18.5,
    paddingLeft: 14,
    paddingRight: 5
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 15,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 99,
    marginTop: 1,
    left: 0,
    right: 0
  },
  DropdownIndicator: {
    padding: 0
  },
  ClearIndicator: {
    position: 'absolute',
    right: 20
  },
  helperText: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}))
