import React, { useCallback } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import useStyles from './styles'
import logo from './logo.svg'
import LoginForm from './LoginForm'
import { authLogin } from '../../store/modules/auth'
import { formSubmit } from '../../helpers/form'
const initialValues = {
  email: '',
  password: ''
}

const Login = ({ authLogin }) => {
  let classes = useStyles()
  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        authLogin,
        {
          data: payload
        },
        formActions
      )
    },
    [authLogin]
  )

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Talents Hub</Typography>
      </div>
      <div className={classes.formContainer}>
        <Formik onSubmit={handleSubmit} initialValues={initialValues} component={LoginForm} />
        {/* { classes => <LoginForm classes={classes}/>} */}
        {/* </Formik> */}
      </div>
    </Grid>
  )
}

const actions = {
  authLogin
}
export default connect(
  null,
  actions
)(Login)
