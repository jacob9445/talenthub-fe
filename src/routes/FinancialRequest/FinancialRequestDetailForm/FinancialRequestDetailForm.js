import React, { useCallback, useMemo, useEffect } from 'react'
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
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { URL_PREFIXES, FINANCIALREQUEST_TYPE_OPTIONS, FINANCIALREQUEST_TYPE } from 'config/constants'
import { meSelector } from 'store/modules/auth'
import { getProjects, projectsSelector } from 'store/modules/project'

export const validationSchema = Yup.object().shape({
  amount: Yup.number().required('This field is required!')
  // description: Yup.string().required('This field is required!')
})

const validateProjectField = (value, type) =>
  type !== FINANCIALREQUEST_TYPE.SENDPAYMENT ? (!value ? 'This field is required!' : undefined) : undefined

const FinancialRequestDetailForm = ({
  handleSubmit,
  values,
  location,
  history,
  me: { role },
  me,
  match: { params },
  getProjects,
  projects
}) => {
  const classes = useStyles()

  useEffect(() => {
    getProjects(me)
  }, [getProjects, me])

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[role]}/financial-requests`)
  }, [location, history, role])

  const projectList = useMemo(() => {
    if (projects) {
      return projects.results.map(project => ({
        label: project.title,
        value: project.id
      }))
    } else {
      return []
    }
  }, [projects])

  const isUpdateMode = useMemo(() => Boolean(params.id), [params.id])
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FormSelect}
        type="text"
        htmlId="type"
        name="type"
        label="Type"
        options={FINANCIALREQUEST_TYPE_OPTIONS}
      />
      <Field
        component={FormInput}
        type="number"
        htmlId="amount"
        name="amount"
        label="Amount"
        extra={{ placeholder: 'Amount to send or receive' }}
      />
      <Field
        component={FormInput}
        type="text"
        htmlId="address"
        name="address"
        label="Address"
        extra={{ placeholder: 'Address to send or receive from. Email or btc address' }}
      />
      {values.type !== FINANCIALREQUEST_TYPE.SENDPAYMENT ? (
        <Field
          component={FormEditableSelect}
          type="text"
          htmlId="project"
          name="project"
          label="Project"
          options={projectList}
          validate={value => validateProjectField(value, values.type)}
        />
      ) : null}
      <Field
        component={FormInput}
        type="text"
        htmlId="description"
        name="description"
        label="Description"
        extra={{
          multiline: true,
          rows: 5,
          placeholder: 'Payment Platform, Request Details (Details on invoice or payment note) ...'
        }}
      />

      <div className={classes.formButtonWrapper}>
        <Button type="submit" variant="contained" color="primary" className={classes.formButton}>
          {isUpdateMode ? 'Update' : 'Create'}
        </Button>
        <Button variant="contained" color="secondary" className={classes.formButton} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

FinancialRequestDetailForm.propTypes = {
  getProjects: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  me: PropTypes.object,
  projects: PropTypes.object,
  values: PropTypes.object.isRequired
}

const selector = createStructuredSelector({
  me: meSelector,
  projects: projectsSelector
})

const actions = {
  getProjects
}

export default compose(withRouter, connect(selector, actions))(FinancialRequestDetailForm)
