import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { path } from 'ramda'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import AccountsTable from './AccountsTable'
import { getAccounts, accountsSelector, accountsLoadingSelector } from 'store/modules/accounts'
import { meSelector } from 'store/modules/auth'

const Accounts = ({ getAccounts, accounts, loadingAccounts, me }) => {

  useEffect(() => {
    getAccounts()
  }, [getAccounts])

  console.log({accounts})
  const data = useMemo(() => {
    return accounts ? accounts.map(account => ({
      ...account,
      profile: `${path(['profile', 'first_name'], account)} ${path(['profile', 'last_name'], account)}`
    })) : null
  }, [accounts])

  const handleDelete = useCallback((id) => {
    console.log(id)
  }, [])

  if(loadingAccounts) return <Spinner />
  else return (
    <Grid container>
      <Grid item xs={12}>
        <Widget 
          title='Accounts'
          noBodyPadding
          disableWidgetMenu
        >
          <AccountsTable 
            data={data}
            myRole={me.role}
            handleDelete={handleDelete}
          />
        </Widget>
      </Grid>
    </Grid>
  );
};

Accounts.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  accounts: PropTypes.array,
  loadingAccounts: PropTypes.bool.isRequired,
  me: PropTypes.object
};

const actions = {
  getAccounts
}

const selectors = createStructuredSelector({
  accounts: accountsSelector,
  loadingAccounts: accountsLoadingSelector,
  me: meSelector
})

export default connect(selectors, actions)(Accounts);

