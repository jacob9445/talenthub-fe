import React from 'react'
import  { TextField, FormLabel} from '@material-ui/core'
import useStyles from './styles'


const FormInput = ({type, field, form, htmlId, label, readOnly}) => {
	let classes = useStyles()

	return (
		<div className={classes.wrapper}>
			<FormLabel htmlFor={htmlId}> {label} </FormLabel>
				<TextField
					id={htmlId}
					margin="normal"
					type={type}
					variant='outlined'
					fullWidth
					className={classes.textField}
					inputProps={ readOnly ? {
						readOnly: true
					} : {}}
					{...field}
				/>
		</div>
		
	)
}

export default FormInput;