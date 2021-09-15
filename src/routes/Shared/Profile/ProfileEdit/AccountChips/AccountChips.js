import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { Person as AccountIcon, Add } from '@material-ui/icons'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { meSelector } from 'store/modules/auth'
import { PLATFORM_LABELS, URL_PREFIXES } from 'config/constants'
import BlockChip from 'components/BlockChip'

const AccountChips = ({ accounts, history, location, me }) => {
  const showProfileDetail = useCallback(
    id => () => {
      history.push(`/${URL_PREFIXES[me.role]}/accounts/${id}/detail`, location.pathname)
    },
    [history, location, me.role]
  )

  const showCreateAccountPage = useCallback(() => {
    history.push(`/${URL_PREFIXES[me.role]}/accounts/new`, location.pathname)
  }, [history, location, me.role])

  return (
    <Grid container alignItems="center" wrap="wrap">
      {accounts.map(account => (
        <BlockChip
          key={account.id}
          label={`${account.email}(${PLATFORM_LABELS[account.platform_type]})`}
          color="primary"
          icon={<AccountIcon />}
          variant="outlined"
          onClick={showProfileDetail(account.id)}
        />
      ))}
      <BlockChip
        key={accounts.length ? accounts.length : 1}
        label={accounts.length ? 'Add another account' : 'Add a new account'}
        color="primary"
        icon={<Add />}
        onClick={showCreateAccountPage}
      />
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

export default compose(withRouter, connect(selector))(AccountChips)
