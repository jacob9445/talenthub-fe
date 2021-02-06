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
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { URL_PREFIXES, FINANCIALREQUEST_TYPE_OPTIONS, FINANCIALREQUEST_TYPE } from 'config/constants'
import { meSelector } from 'store/modules/auth'
import { getClients, clientsSelector } from 'store/modules/clients'
import { getPartners, partnersSelector } from 'store/modules/partners'
import { getProjects, projectsSelector } from 'store/modules/project'

export const validationSchema = Yup.object().shape({
  amount: Yup.number().required('This field is required!'),
  project: Yup.number().required('This field is required!')
})

const validateClientField = (value, type) =>
  type !== FINANCIALREQUEST_TYPE.SENDPAYMENT ? (!value ? 'This field is required!' : undefined) : undefined

const validatePartnerField = (value, type) =>
  type === FINANCIALREQUEST_TYPE.SENDPAYMENT ? (!value ? 'This field is required!' : undefined) : undefined

const FinancialRequestDetailForm = ({
  handleSubmit,
  values,
  location,
  history,
  me: { role },
  me,
  match: { params },
  clients,
  getClients,
  getPartners,
  partners,
  getProjects,
  projects
}) => {
  const classes = useStyles()

  useEffect(() => {
    getClients()
  }, [getClients])

  useEffect(() => {
    getPartners(me)
  }, [getPartners, me])

  useEffect(() => {
    getProjects(me)
  }, [getProjects, me])

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[role]}/financial-requests`)
  }, [location, history, role])

  const clientList = useMemo(() => {
    if (clients) {
      return clients.map(client => ({
        display: client.full_name,
        value: client.id
      }))
    } else {
      return []
    }
  }, [clients])

  const partnerList = useMemo(() => {
    if (partners) {
      return partners.map(partner => ({
        display: partner.full_name,
        value: partner.id
      }))
    } else {
      return []
    }
  }, [partners])

  const projectList = useMemo(() => {
    if (projects) {
      return projects.map(project => ({
        display: project.title,
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
      <Field component={FormInput} type="number" htmlId="amount" name="amount" label="Amount" />
      {values.type !== FINANCIALREQUEST_TYPE.SENDPAYMENT ? (
        <Field
          component={FormSelect}
          type="text"
          htmlId="client"
          name="client"
          label="Client"
          validate={value => validateClientField(value, values.type)}
          options={clientList}
        />
      ) : null}
      {values.type === FINANCIALREQUEST_TYPE.SENDPAYMENT ? (
        <Field
          component={FormSelect}
          type="text"
          htmlId="partner"
          name="partner"
          label="Partner"
          validate={value => validatePartnerField(value, values.type)}
          options={partnerList}
        />
      ) : null}
      <Field component={FormSelect} type="text" htmlId="project" name="project" label="Project" options={projectList} />

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
  clients: PropTypes.array,
  getClients: PropTypes.func.isRequired,
  getPartners: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  me: PropTypes.object,
  partners: PropTypes.array,
  projects: PropTypes.array,
  values: PropTypes.object.isRequired
}

const selector = createStructuredSelector({
  me: meSelector,
  clients: clientsSelector,
  partners: partnersSelector,
  projects: projectsSelector
})

const actions = {
  getClients,
  getPartners,
  getProjects
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(FinancialRequestDetailForm)
