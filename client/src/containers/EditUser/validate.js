const validate = (values) => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Required';
	}

	if (!values.email) {
		errors.email = 'Required';
	}

	if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	return errors;
};

export default validate;
