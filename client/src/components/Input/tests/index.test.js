/* eslint-env jest */

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Input from '../index';
import {
	InputContainer,
	InputField,
	InputPopup,
	InputLabel
} from '../styles';

describe('<Input />', () => {
	it('should render the input', () => {
		const renderedComponent = shallow(
			<Input
				type="text"
				placeholder="Your Name"
				label="Your Name"
				name="name"
				meta={{}}
			/>
		);

		expect(renderedComponent.find(InputContainer).length).toBe(1);
		expect(renderedComponent.find(InputPopup).length).toBe(0);
		expect(renderedComponent.find(InputLabel).length).toBe(1);
		expect(renderedComponent.find(InputField).length).toBe(1);
	});

	it('should render the input with validate error', () => {
		const renderedComponent = shallow(
			<Input
				type="text"
				placeholder="Your Name"
				label="Your Name"
				name="name"
				meta={{
					touched: true,
					error: 'test'
				}}
			/>
		);

		expect(renderedComponent.find(InputContainer).length).toBe(1);
		expect(renderedComponent.find(InputPopup).length).toBe(1);
		expect(renderedComponent.find(InputLabel).length).toBe(1);
		expect(renderedComponent.find(InputField).length).toBe(1);
	});

	it('should render the input with validate error and warning', () => {
		const renderedComponent = shallow(
			<Input
				type="text"
				placeholder="Your Name"
				label="Your Name"
				name="name"
				meta={{
					touched: true,
					error: 'test',
					warning: 'test'
				}}
			/>
		);

		expect(renderedComponent.find(InputContainer).length).toBe(1);
		expect(renderedComponent.find(InputPopup).length).toBe(2);
		expect(renderedComponent.find(InputLabel).length).toBe(1);
		expect(renderedComponent.find(InputField).length).toBe(1);
	});
});
