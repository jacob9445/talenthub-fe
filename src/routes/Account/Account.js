import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { path } from 'ramda'
import { show } from 'redux-modal'
import { Link } from 'react-router-dom'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import AccountTable from './AccountTable'
import { getAccounts, deleteAccountAndRefresh, accountsSelector, accountsLoadingSelector } from 'store/modules/account'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const Account = ({ getAccounts, deleteAccountAndRefresh, accounts, loadingAccounts, me, show }) => {
  useEffect(() => {
    getAccounts()
  }, [getAccounts])

  const data = useMemo(() => {
    return accounts
      ? accounts.map(account => ({
          ...account,
          profile: `${path(['profile', 'first_name'], account)} ${path(['profile', 'last_name'], account)}`
        }))
      : null
  }, [accounts])

  const handleDelete = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to delete the account?',
        proceed: () => {
          deleteAccountAndRefresh(id)
        }
      })
    },
    [show, deleteAccountAndRefresh]
  )

  if (loadingAccounts) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget
            title="Accounts"
            noBodyPadding
            disableWidgetMenu
            WidgetButton={
              <Button color="primary" component={Link} to={`/${URL_PREFIXES[me.role]}/accounts/create`}>
                Add Accounts
              </Button>
            }>
            <AccountTable data={data} myRole={me.role} handleDelete={handleDelete} />
          </Widget>
        </Grid>
      </Grid>
    )
}

Account.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  deleteAccountAndRefresh: PropTypes.func.isRequired,
  accounts: PropTypes.array,
  loadingAccounts: PropTypes.bool.isRequired,
  me: PropTypes.object,
  show: PropTypes.func.isRequired
}

const actions = {
  getAccounts,
  deleteAccountAndRefresh,
  show
}

const selectors = createStructuredSelector({
  accounts: accountsSelector,
  loadingAccounts: accountsLoadingSelector,
  me: meSelector
})

export default connect(
  selectors,
  actions
)(Account)
