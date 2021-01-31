import React, { useEffect, useCallback, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import PartnerDetailForm, { validationSchema } from '../PartnerDetailForm'
import {
  getPartnerDetail,
  updatePartnerDetail,
  partnerDetailSelector,
  partnerDetailLoadingSelector
} from 'store/modules/partners'
import Spinner from 'components/Spinner'
import { meSelector } from 'store/modules/auth'
import { ROLES } from 'config/constants'

const PartnerEdit = ({
  getPartnerDetail,
  updatePartnerDetail,
  partnerDetail,
  isDetailLoading,
  match: { params },
  me
}) => {
  useEffect(() => {
    getPartnerDetail(params.id)
  }, [getPartnerDetail, params])

  const initialValues = useMemo(
    () => ({
      full_name: partnerDetail?.full_name || '',
      email: partnerDetail?.email || '',
      address: partnerDetail?.address || '',
      dob: partnerDetail?.dob || '',
      phone_num: partnerDetail?.phone_num || '',
      owner: partnerDetail?.owner.id || '',
      contact_method: partnerDetail?.contact_method || ''
    }),
    [partnerDetail]
  )

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updatePartnerDetail,
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
    [updatePartnerDetail, params.id, me]
  )

  if (isDetailLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Partner Detail" disableWidgetMenu>
            <Formik
              component={PartnerDetailForm}
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={handleSubmit}></Formik>
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getPartnerDetail,
  updatePartnerDetail
}

const selectors = createStructuredSelector({
  partnerDetail: partnerDetailSelector,
  isDetailLoading: partnerDetailLoadingSelector,
  me: meSelector
})

PartnerEdit.propTypes = {
  getPartnerDetail: PropTypes.func.isRequired,
  updatePartnerDetail: PropTypes.func.isRequired,
  partnerDetail: PropTypes.object,
  isDetailLoading: PropTypes.bool.isRequired,
  params: PropTypes.object
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(PartnerEdit)
