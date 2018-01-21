import React from 'react';
import PropTypes from 'prop-types';

import {
	InputContainer,
	InputField,
	InputPopup,
	InputLabel
} from './styles';

const Input = ({ input, meta, type, placeholder, label }) =>
	<InputContainer>
		<InputLabel>{label}</InputLabel>
		<InputField
			{...input}
			type={type}
			placeHolder={placeholder}
		/>
		{meta.touched && meta.error
		&& <InputPopup error>{meta.error}</InputPopup>
		}
		{meta.touched && meta.warning
		&& <InputPopup warning>{meta.warning}</InputPopup>
		}
	</InputContainer>;

Input.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string
};

export default Input;
