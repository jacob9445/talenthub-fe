import React, { useCallback, useMemo } from 'react'
import { Button } from '@material-ui/core'
import { Field } from 'formik'
import { withRouter } from 'react-router'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import FormInput from 'components/FormInput'
import FormEditableSelect from 'components/FormEditableSelect'
import useStyles from './styles'
import { URL_PREFIXES, PAYMENT_PLATFORM_OPTIONS } from 'config/constants'
import { meSelector } from 'store/modules/auth'

export const validationSchema = Yup.object().shape({
  platform: Yup.string().required('This field is required!'),
  address: Yup.string().required('This field is required!'),
  display_name: Yup.string().required('This field is required!')
})

const PaymentAccountDetailForm = ({ handleSubmit, values, location, history, me: { role }, me, match: { params } }) => {
  const classes = useStyles()
  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/payment-accounts`)
  }, [location, history, me])

  const isUpdateMode = useMemo(() => Boolean(params.id), [params.id])
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FormEditableSelect}
        htmlId="platform"
        name="platform"
        label="Platform"
        placeholder="Choose one platform..."
        options={PAYMENT_PLATFORM_OPTIONS}
      />
      <Field component={FormInput} type="text" htmlId="address" name="address" label="Address" />
      <Field component={FormInput} type="text" htmlId="displayName" name="display_name" label="Dispaly Name" />

      <div className={classes.formButtonWrapper}>
        <Button type="submit" variant="contained" color="primary" className={classes.formButton}>
          {isUpdateMode ? 'Update' : 'Create'}
        </Button>
        <Button variant="contained" color="secondary" className={classes.formButton} onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </form>
  )
}

PaymentAccountDetailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  me: PropTypes.object,
  match: PropTypes.object.isRequired
}

const selector = createStructuredSelector({
  me: meSelector
})

export default compose(withRouter, connect(selector, null))(PaymentAccountDetailForm)
