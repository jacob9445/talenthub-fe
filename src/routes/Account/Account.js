import React, { useCallback, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { show } from 'redux-modal'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import AccountTable from './AccountTable'
import { getAccounts, deleteAccountAndRefresh, accountsSelector, accountsLoadingSelector } from 'store/modules/account'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'

const Account = ({
  getAccounts,
  deleteAccountAndRefresh,
  accounts,
  loadingAccounts,
  me,
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getAccounts({
      params: pagination
    })
  }, [getAccounts, pagination])

  // const data = useMemo(() => {
  //   return accounts
  //     ? accounts.map(account => ({
  //         ...account,
  //         profile: `${path(['profile', 'first_name'], account)} ${path(['profile', 'last_name'], account)}`
  //       }))
  //     : null
  // }, [accounts])

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
              <Button color="primary" component={Link} to={`/${URL_PREFIXES[me.role]}/accounts/new`}>
                Add Accounts
              </Button>
            }>
            <AccountTable
              data={accounts}
              myRole={me.role}
              handleDelete={handleDelete}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </Widget>
        </Grid>
      </Grid>
    )
}

Account.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  deleteAccountAndRefresh: PropTypes.func.isRequired,
  accounts: PropTypes.object,
  loadingAccounts: PropTypes.bool.isRequired,
  me: PropTypes.object,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
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

export default compose(
  withPaginationInfo,
  connect(
    selectors,
    actions
  )
)(Account)
