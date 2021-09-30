import React from 'react'
import { Field } from 'formik'
import { Grid, Button } from '@material-ui/core'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

import FormDatePicker from 'components/FormDatePicker'

export const validationSchema = Yup.object().shape({
  from: Yup.string()
    .nullable()
    .required('This field is required'),
  to: Yup.string()
    .nullable()
    .required('This field is required')
})

function DateRangePickerForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item>
          <Field component={FormDatePicker} name="from" label="From" />
        </Grid>
        <Grid item>
          <Field component={FormDatePicker} name="to" label="To" />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Filter
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

DateRangePickerForm.propTypes = {
  onSubmit: PropTypes.func
}

export default DateRangePickerForm
