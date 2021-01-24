import React, { useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { pick, path, split, nth, compose } from 'ramda'

import {
  getAccountDetail,
  accountDetailSelector,
  updateAccount,
  accountDetailLoadingSelector
} from 'store/modules/accounts'
import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import AccountDetailFrom from '../AccountDetailForm'
import Spinner from 'components/Spinner'

const AccountDetail = ({ match: { params }, getAccountDetail, accountDetail, updateAccount, isLoading }) => {
  useEffect(() => {
    getAccountDetail(params.id)
  }, [getAccountDetail, params.id])

  const initialValues = useMemo(
    () =>
      accountDetail
        ? {
            ...pick(['platform_type', 'email', 'password', 'location', 'recovery_email', 'url'], accountDetail),
            profile: `${path(['profile', 'first_name'], accountDetail)} ${path(
              ['profile', 'last_name'],
              accountDetail
            )}`
          }
        : {
            profile: '',
            platform_type: '',
            email: '',
            password: '',
            location: '',
            recovery_email: '',
            url: ''
          },
    [accountDetail]
  )

  console.log({ initialValues })

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
      <Widget title="Account Detail" disableWidgetMenu>
        <Formik
          component={AccountDetailFrom}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        />
      </Widget>
    )
}

AccountDetail.propTypes = {
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
)(AccountDetail)
