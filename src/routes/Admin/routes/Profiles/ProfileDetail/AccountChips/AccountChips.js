import React, { useCallback }from 'react'
import PropTypes from 'prop-types'
import { Grid, Chip } from '@material-ui/core'
import { Person as AccountIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { withRouter } from 'react-router'
import { PLATFORM_LABELS } from 'config/constants'
const useStyles = makeStyles( theme => ({
  chip: {
    margin: theme.spacing(1) / 2,
  }
}))

const AccountChips = ({ accounts, history, location}) => {
  const classes = useStyles()

  const showProfileDetail = useCallback((id) => () => {
    history.push(`/admin/accounts/${id}/detail`, location.pathname)
  }, [history, location])

  return (
    <Grid
      container
      alignItems='center'
      wrap='wrap'
    >
    {
      accounts.map(account => (
        <Chip
          key={account.id}
          label={`${account.email}(${PLATFORM_LABELS[account.platform_type]})`}
          color="primary"
          icon={<AccountIcon />}
          variant="outlined"
          className={classes.chip}
          onClick={showProfileDetail(account.id)}
        />
      ))
    }
    </Grid>
  )
}

AccountChips.propTypes = {
  accounts: PropTypes.array.isRequired
}

export default withRouter(AccountChips);