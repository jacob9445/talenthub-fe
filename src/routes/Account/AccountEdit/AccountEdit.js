import React, { useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { path, split, nth, compose } from 'ramda'
import { Grid } from '@material-ui/core'

import {
  getAccountDetail,
  accountDetailSelector,
  updateAccount,
  accountDetailLoadingSelector
} from 'store/modules/account'
import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import AccountDetailFrom, { validationSchema } from '../AccountDetailForm'
import Spinner from 'components/Spinner'

const AccountEdit = ({ match: { params }, getAccountDetail, accountDetail, updateAccount, isLoading }) => {
  useEffect(() => {
    getAccountDetail(params.id)
  }, [getAccountDetail, params.id])

  const initialValues = useMemo(
    () => ({
      profile: '',
      platform_type: accountDetail?.platform_type || '',
      email: accountDetail?.email || '',
      password: accountDetail?.password || '',
      location: accountDetail?.location || '',
      recovery_email: accountDetail?.recovery_email || '',
      url: accountDetail?.url || ''
    }),
    [accountDetail]
  )

  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        updateAccount,
        {
          data: {
            ...payload,
            profile: {
              first_name: compose(
                nth(0),
                split(' '),
                path(['profile'])
              )(payload),
              last_name: compose(
                nth(1),
                split(' '),
                path(['profile'])
              )(payload)
            }
          },
          id: params.id
        },
        formActions
      )
    },
    [updateAccount, params.id]
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
  isLoading: PropTypes.bool.isRequired
}

const actions = {
  getAccountDetail,
  updateAccount
}

const selectors = createStructuredSelector({
  accountDetail: accountDetailSelector,
  isLoading: accountDetailLoadingSelector
})

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(AccountEdit)
