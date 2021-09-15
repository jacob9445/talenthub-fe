import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { withRouter } from 'react-router'
import { show } from 'redux-modal'
import { Link } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import { Formik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withPaginationInfo from 'hocs/withPaginationInfo'
import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import SearchForm from 'components/SearchForm'
import AccountTable from './AccountTable'
import { URL_PREFIXES } from 'config/constants'
import { meSelector } from 'store/modules/auth'
import { ListDataType } from 'helpers/prop-types'
import { jsonToQueryString, parseQueryString } from 'helpers/utils'
import { getAccounts, deleteAccountAndRefresh, accountsSelector, accountsLoadingSelector } from 'store/modules/account'

const Account = ({
  getAccounts,
  deleteAccountAndRefresh,
  accounts,
  loadingAccounts,
  me,
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  history,
  location
}) => {
  const initialValues = useMemo(() => {
    return R.pick(['search'], parseQueryString(location.search))
  }, [location])

  useEffect(() => {
    getAccounts({
      params: { ...pagination, ...initialValues }
    })
  }, [getAccounts, pagination, initialValues])

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

  const handleSubmit = useCallback(
    (formValues, formActinos) => {
      history.push({
        search: jsonToQueryString({
          ...pagination,
          ...formValues
        })
      })
    },
    [history, pagination]
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
            <Formik initialValues={initialValues} component={SearchForm} onSubmit={handleSubmit} />
            <AccountTable
              data={accounts}
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
  accounts: ListDataType,
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

export default compose(withRouter, withPaginationInfo, connect(selectors, actions))(Account)
