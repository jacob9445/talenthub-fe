import React, { useCallback, useMemo } from 'react'
import { Field } from 'formik'
import { has } from 'ramda'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'

import FormInput from 'components/FormInput'
import FormSelect from 'components/FormSelect'
import { CLIENT_TYPES } from 'config/constants'
import useStyles from './styles'

const clientTypeOptions = [
  {
    value: CLIENT_TYPES.COMPANY,
    display: 'Company'
  },
  {
    value: CLIENT_TYPES.INDIVIDUAL,
    display: 'Individual'
  }
]

const ClientDetailForm = ({ handleSubmit, values, initialValues, location, history }) => {
  const classes = useStyles()

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push('/developer/clients')
  }, [location, history])

  const isCreateMode = useMemo(() => has(initialValues, 'started_at'), [initialValues])

  return (
    <form onSubmit={handleSubmit}>
      <Field 
        component={FormInput}
        type='text'
        htmlId='full_name'
        name='full_name'
        label='Full Name'
      />
      <Field 
        component={FormSelect}
        htmlId='type'
        name='type'
        label='Type'
        options={clientTypeOptions}
      />
      { values.type === CLIENT_TYPES.COMPANY &&
        <Field
          component={FormInput}
          type='text'
          htmlId='company_name'
          name='company_name'
          label='Company Name' 
        />
      }
      {
        isCreateMode &&
        <Field
          component={FormInput}
          type='date'
          htmlId='started_at'
          name='started_at'
          label='Started at'
        />
      }
      <div className={classes.formButtonWrapper}>
        <Button
          type='submit' 
          variant='contained'
          color='primary'
          className={classes.formButton}
        >
        { isCreateMode ? 'Update' : 'Create'}
        </Button>
        <Button
          variant='contained'
          color='secondary'
          className={classes.formButton}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default withRouter(ClientDetailForm)
  