// import * as R from 'ramda'

export const formSubmit = (actionCreator, payload, formActions) => {
  return new Promise((resolve, reject) => {
    formActions.setSubmitting(false)
    return actionCreator({
      ...payload,
      pending: () => {
        formActions.setSubmitting(true)
      },
      resolve: () => {
        resolve()
        formActions.setSubmitting(false)
      },
      reject
    })
  }).catch(ex => {
    const res = ex.response ? ex.response : ex
    //const error = R.path(['error'], res.data || res.error || res)
    const error = res.data
    if (typeof error === 'object') {
      console.log({ error })
      const { message, errors, non_field_errors: globalError, ...otherFieldErrors } = error
      formActions.setErrors({
        _error: message || globalError,
        ...errors,
        ...otherFieldErrors
      })
    } else {
      formActions.setErrors({
        _error: 'Internal Server Error'
      })
    }

    formActions.setSubmitting(false)
  })
}

export const asyncValidate = (actionCreator, payload) =>
  new Promise((resolve, reject) => {
    actionCreator({
      ...payload,
      resolve: () => resolve(),
      reject
    })
  })

export const asyncValidateField = (actionCreator, field, value) =>
  value
    ? asyncValidate(actionCreator, {
        data: { [field]: value }
      })
        .then(() => {})
        .catch(ex => {
          if (ex.status === 400) {
            throw ex.data
          }
        })
    : Promise.resolve()
