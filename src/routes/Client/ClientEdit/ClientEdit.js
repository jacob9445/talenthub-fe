import React, { useEffect, useCallback, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { pick } from 'ramda'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import ClientDetailForm, { validationSchema } from '../ClientDetailForm'
import { getClientDetail, updateClient, clientDetailSelector, clientDetailLoadingSelector } from 'store/modules/client'
import Spinner from 'components/Spinner'
import { CLIENT_TYPES } from 'config/constants'
import { meSelector } from 'store/modules/auth'
import { ROLES } from 'config/constants'

const ClientEdit = ({ getClientDetail, updateClient, clientDetail, isDetailLoading, match: { params }, me }) => {
  useEffect(() => {
    getClientDetail(params.id)
  }, [getClientDetail, params.id])

  const initialValues = useMemo(() => {
    return !clientDetail
      ? {
          full_name: '',
          type: CLIENT_TYPES.COMPANY,
          company_name: '',
          started_at: '',
          owner: ''
        }
      : {
          ...pick(['full_name', 'type', 'company_name', 'started_at'])(clientDetail),
          owner: clientDetail.owner.id
        }
  }, [clientDetail])

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updateClient,
        {
          data: {
            ...values,
            ...(me.role === ROLES.DEVELOPER
              ? {
                  owner: me.id
                }
              : {})
          },
          id: params.id
        },
        formActions
      )
    },
    [updateClient, params.id, me]
  )

  if (isDetailLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Client Detail" disableWidgetMenu>
            <Formik
              component={ClientDetailForm}
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            />
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getClientDetail,
  updateClient
}

const selectors = createStructuredSelector({
  clientDetail: clientDetailSelector,
  isDetailLoading: clientDetailLoadingSelector,
  me: meSelector
})

ClientEdit.propTypes = {
  getClientDetail: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  clientDetail: PropTypes.object,
  isDetailLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  me: PropTypes.object
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(ClientEdit)
