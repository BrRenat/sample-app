import React from 'react'

import {
	InputContainer,
	InputIcon,
	InputField,
	InputPopup,
	InputLabel,
} from './styles'

const Input = ({ input, meta, className, type, placeholder, label }) =>
	<InputContainer className={className}>
		<InputLabel>{label}</InputLabel>
		<InputField
			{...input}
			type={type}
			placeHolder={placeholder}
		/>
		{meta.touched && meta.error &&
		<InputPopup error>{meta.error}</InputPopup>
		}
		{meta.touched && meta.warning &&
		<InputPopup warning>{meta.warning}</InputPopup>
		}
	</InputContainer>

export default Input
