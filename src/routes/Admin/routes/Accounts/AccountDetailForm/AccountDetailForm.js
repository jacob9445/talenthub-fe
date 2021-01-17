import React, { useCallback } from 'react'
import { Field } from 'formik'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'

import FormInput from 'components/FormInput'
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { PLATFORMS } from 'config/constants'

const platformOptions = [
  {
    display: 'Email',
    value: PLATFORMS.EMAIL
  },
  {
    display: 'Skype',
    value: PLATFORMS.SKYPE
  },
  {
    display: 'Slack',
    value: PLATFORMS.SLACK
  },
  {
    display: 'MS Team',
    value: PLATFORMS.MS_TEAM
  },
  {
    display: 'Github',
    value: PLATFORMS.GITHUB
  },
  {
    display: 'Bitbucket',
    value: PLATFORMS.BITBUCKET
  },
]


const AccountDetailForm = ({ location, history, handleSubmit}) => {
  const classes = useStyles()

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push('/admin/accounts')
  }, [location, history])
  
  return (
    <form onSubmit={handleSubmit}>
      <Field 
        component={FormInput}
        htmlId='profile'
        type='text'
        name='profile'
        label='Profile'
      />
      <Field 
        component={FormSelect}
        htmlId='platform_type'
        type='text'
        name='platform_type'
        label='Platform Type'
        options={platformOptions}
      />
      <Field 
        component={FormInput}
        htmlId='password'
        type='text'
        name='password'
        label='Password'
      />
      <Field 
        component={FormInput}
        htmlId='location'
        type='text'
        name='location'
        label='Location'
      />
      <Field 
        component={FormInput}
        htmlId='recovery_email'
        type='text'
        name='recovery_email'
        label='Recovery Email'
      />
      <Field 
        component={FormInput}
        htmlId='url'
        type='text'
        name='url'
        label='URL'
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
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default withRouter(AccountDetailForm)
