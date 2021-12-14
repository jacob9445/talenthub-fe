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
  participantsRow: {
    marginBottom: theme.spacing(2),
    alignItems: 'top'
  },
  participantsTitle: {
    marginBottom: theme.spacing(1)
  },
  participantsAdd: {
    float: 'right'
  },
  participantsRemove: {
    marginTop: theme.spacing(1)
  }
}))
