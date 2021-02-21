import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Grid, Chip } from '@material-ui/core'
import { Person as AccountIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { meSelector } from 'store/modules/auth'
import { PLATFORM_LABELS, URL_PREFIXES } from 'config/constants'
const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(1) / 2
  }
}))

const AccountChips = ({ accounts, history, location, me }) => {
  const classes = useStyles()

  const showProfileDetail = useCallback(
    id => () => {
      history.push(`/${URL_PREFIXES[me.role]}/accounts/${id}/detail`, location.pathname)
    },
    [history, location, me.role]
  )

  return (
    <Grid container alignItems="center" wrap="wrap">
      {accounts.map(account => (
        <Chip
          key={account.id}
          label={`${account.email}(${PLATFORM_LABELS[account.platform_type]})`}
          color="primary"
          icon={<AccountIcon />}
          variant="outlined"
          className={classes.chip}
          onClick={showProfileDetail(account.id)}
        />
      ))}
    </Grid>
  )
}

AccountChips.propTypes = {
  accounts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  me: PropTypes.object
}

const selector = createStructuredSelector({
  me: meSelector
})

export default compose(
  withRouter,
  connect(selector)
)(AccountChips)