import React from 'react'
import { Search as SearchIcon } from '@material-ui/icons'
import { InputAdornment, IconButton } from '@material-ui/core'
import { Field } from 'formik'

import useStyles from './styles'
import FormInput from 'components/FormInput'

const SearchForm = ({ handleSubmit }) => {
  const classes = useStyles()
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Field
        htmlId="search"
        name="search"
        type="text"
        component={FormInput}
        extra={{
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </form>
  )
}

export default SearchForm
