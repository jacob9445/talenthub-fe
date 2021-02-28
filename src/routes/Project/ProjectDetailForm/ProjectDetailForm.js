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
import {
  URL_PREFIXES,
  PROJECT_TYPE_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  PROJECT_STATUS,
  PROJECT_TYPE
} from 'config/constants'
import { meSelector } from 'store/modules/auth'
import { ROLES } from 'config/constants'
import { usersSelector, getUsers } from 'store/modules/user'
import { getClients, clientsSelector } from 'store/modules/client'

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('This field is required!'),
  weakly_limit: Yup.number().when('type', {
    is: PROJECT_TYPE.HOULYFT || PROJECT_TYPE.HOULYPT || PROJECT_TYPE.CONTRACT,
    then: Yup.number().required('This field name is required!'),
    otherwise: Yup.number()
  }),
  price: Yup.number().required('This field is required!'),
  started_at: Yup.date().required('This field is required!'),
  client: Yup.number().required('This field is required!')
})

const validateProjectStarterField = (value, role) =>
  role !== ROLES.DEVELOPER ? (!value ? 'This field is required!' : undefined) : undefined

const validateEndedAtField = (value, project_status, project_type) =>
  project_status === PROJECT_STATUS.ENDED || project_type === PROJECT_TYPE.BUDGET
    ? !value
      ? 'This field is required!'
      : undefined
    : undefined

const ProjectDetailForm = ({
  handleSubmit,
  values,
  location,
  history,
  me: { role },
  me,
  users,
  getUsers,
  match: { params },
  clients,
  getClients
}) => {
  const classes = useStyles()

  useEffect(() => {
    me.role !== ROLES.DEVELOPER && getUsers(me)
  }, [me, getUsers])

  useEffect(() => {
    getClients()
  }, [getClients])

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[role]}/projects`)
  }, [location, history, role])

  const userList = useMemo(() => {
    if (users) {
      return users.results.map(user => ({
        display: `${user.first_name} ${user.last_name}`,
        value: user.id
      }))
    } else {
      return []
    }
  }, [users])

  const clientList = useMemo(() => {
    if (clients) {
      return clients.results.map(client => ({
        display: client.full_name,
        value: client.id
      }))
    } else {
      return []
    }
  }, [clients])

  const isUpdateMode = useMemo(() => Boolean(params.id), [params.id])
  return (
    <form onSubmit={handleSubmit}>
      <Field component={FormInput} type="text" htmlId="title" name="title" label="Title" />
      <Field component={FormSelect} type="text" htmlId="type" name="type" label="Type" options={PROJECT_TYPE_OPTIONS} />
      {values.type !== PROJECT_TYPE.BUDGET ? (
        <Field component={FormInput} type="number" htmlId="weakly_limit" name="weakly_limit" label="Weakly Limit" />
      ) : null}
      <Field component={FormInput} type="number" htmlId="price" name="price" label="Price" />
      <Field component={FormInput} type="date" htmlId="started_at" name="started_at" label="Started At" />
      {values.status === PROJECT_STATUS.ENDED || values.type === PROJECT_TYPE.BUDGET ? (
        <Field
          component={FormInput}
          type="date"
          htmlId="ended_at"
          name="ended_at"
          label="Ended At"
          validate={value => validateEndedAtField(value, values.status, values.type)}
        />
      ) : null}
      <Field
        component={FormSelect}
        type="text"
        htmlId="status"
        name="status"
        label="Status"
        options={PROJECT_STATUS_OPTIONS}
      />
      <Field component={FormSelect} type="text" htmlId="client" name="client" label="Client" options={clientList} />
      {role !== ROLES.DEVELOPER ? (
        <div>
          <Field
            component={FormSelect}
            type="text"
            htmlId="project_starter"
            name="project_starter"
            label="Project Starter"
            options={userList}
            validate={value => validateProjectStarterField(value, role)}
          />
        </div>
      ) : null}

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

ProjectDetailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  me: PropTypes.object,
  match: PropTypes.object.isRequired,
  users: PropTypes.object,
  getUsers: PropTypes.func.isRequired,
  clients: PropTypes.array,
  getClients: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  me: meSelector,
  users: usersSelector,
  clients: clientsSelector
})

const actions = {
  getUsers,
  getClients
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(ProjectDetailForm)
