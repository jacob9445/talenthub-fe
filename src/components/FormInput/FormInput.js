import React from 'react'
import  { TextField} from '@material-ui/core'
import useStyles from './styles'

const FormInput = ({type, field, form, htmlId, placeholder}) => {
	let classes = useStyles()

	return (
		<TextField
      id={htmlId}
			InputProps={
        {
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }
      }
			margin="normal"
			placeholder={placeholder}
			type={type}
			{...field}
			fullWidth
		/>
	)
}

export default FormInput;