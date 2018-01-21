import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import apiErrorReducer from 'redux/apiError/reducer';
import networkErrorReducer from 'redux/networkError/reducer';

const rootReducer = combineReducers({
	form: formReducer,
	apiError: apiErrorReducer,
	networkError: networkErrorReducer
});

export default rootReducer;
