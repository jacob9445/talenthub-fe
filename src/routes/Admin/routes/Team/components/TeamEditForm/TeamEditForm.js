import React, { useCallback, useMemo } from 'react'
import { Field } from 'formik'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import FormInput from 'components/FormInput'
import useStyles from './styles'

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!')
})

const TeamEditForm = ({ location, history, handleSubmit, match: { params } }) => {
  const classes = useStyles()

  const isEdit = useMemo(() => params.id, [params])
  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push('/admin/teams')
  }, [location, history])

  return (
    <form onSubmit={handleSubmit}>
      <Field component={FormInput} htmlId="name" type="text" name="name" label="Team Name" />
      <div className={classes.formButtonWrapper}>
        <Button type="submit" variant="contained" color="primary" className={classes.formButton}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
        <Button variant="contained" color="secondary" className={classes.formButton} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

TeamEditForm.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default withRouter(TeamEditForm)
