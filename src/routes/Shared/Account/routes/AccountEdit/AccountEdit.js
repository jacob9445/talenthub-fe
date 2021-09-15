import React, { useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { compose } from 'ramda'
import { Grid } from '@material-ui/core'

import {
  getAccountDetail,
  accountDetailSelector,
  updateAccount,
  accountDetailLoadingSelector
} from 'store/modules/account'
import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import AccountDetailFrom, { validationSchema } from '../../components/AccountDetailForm'
import Spinner from 'components/Spinner'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const AccountEdit = ({ match: { params }, getAccountDetail, accountDetail, updateAccount, isLoading, me, history }) => {
  useEffect(() => {
    getAccountDetail(params.id)
  }, [getAccountDetail, params.id])

  const initialValues = useMemo(
    () => ({
      profile: accountDetail?.profile?.id || '',
      platform_type: accountDetail?.platform_type || '',
      email: accountDetail?.email || '',
      password: accountDetail?.password || '',
      location: accountDetail?.location || '',
      extra_info: accountDetail?.extra_info || '',
      url: accountDetail?.url || ''
    }),
    [accountDetail]
  )

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updateAccount,
        {
          data: {
            ...values
          },
          id: params.id,
          success: () => history.push(`/${URL_PREFIXES[me.role]}/accounts`)
        },
        formActions
      )
    },
    [updateAccount, params.id, history, me.role]
  )

  if (isLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Account Detail" disableWidgetMenu>
            <Formik
              component={AccountDetailFrom}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            />
          </Widget>
        </Grid>
      </Grid>
    )
}

AccountEdit.propTypes = {
  params: PropTypes.string,
  getAccountDetail: PropTypes.func.isRequired,
  accountDetail: PropTypes.object,
  updateAccount: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  me: PropTypes.object
}

const actions = {
  getAccountDetail,
  updateAccount
}

const selectors = createStructuredSelector({
  accountDetail: accountDetailSelector,
  isLoading: accountDetailLoadingSelector,
  me: meSelector
})

export default compose(withRouter, connect(selectors, actions))(AccountEdit)
