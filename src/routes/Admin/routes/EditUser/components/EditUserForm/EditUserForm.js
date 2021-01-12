import React, { useEffect, useMemo } from 'react'
import { Field } from 'formik'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'

import FormInput from 'components/FormInput'
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { getTeams, teamsSelector } from 'store/modules/teams'
import Spinner from 'components/Spinner'

const EditUserForm = ({handleSubmit, teams, getTeams}) => {
  const classes = useStyles()

  useEffect( () => {
    getTeams()
  }, [getTeams])
  const options = useMemo(() => 
    typeof teams !== 'undefined' && teams.map(team => ({
    value: team.id,
    display: team.name
  })), [teams])

  if(!teams) return <Spinner />
  else return (
    <form onSubmit={handleSubmit}>
      <Field 
        component={FormInput}
        htmlId='first_name'
        type='text'
        name='first_name'
        label='First Name'
      />
      <Field 
        component={FormInput}
        htmlId='last_name'
        type='text'
        name='last_name'
        label='Last Name'
      />
      <Field 
        component={FormInput}
        htmlId='email'
        type='email'
        name='email'
        label='Email'
      />
      <Field 
        component={FormSelect}
        htmlId='team'
        type='text'
        name='team'
        label='Team'
        options={options}
      />
      <div className={classes.formButtonWrapper}>
        <Button
          type='submit' 
          variant='contained'
          color='primary'
          className={classes.formButton}
        >
          Update
        </Button>
        <Button 
          variant='contained'
          color='secondary'
          className={classes.formButton}
          component={Link}
          to='/admin/users'
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

const actions = {
  getTeams,
}

const selectors = createStructuredSelector({
  teams: teamsSelector,
})

export default connect(selectors, actions)(EditUserForm)