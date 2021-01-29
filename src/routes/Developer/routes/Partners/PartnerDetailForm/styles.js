import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  formButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  formButton: {
    margin: theme.spacing(1)
  },
  contactMethodRow: {
    marginBottom: theme.spacing(2),
    alignItems: 'top'
  },
  contactMethodTitle: {
    marginBottom: theme.spacing(1)
  },
  contactMethodAdd: {
    float: 'right'
  },
  contactMethodRemove: {
    marginTop: theme.spacing(1)
  }
}))
