import { createStore, compose } from 'redux';
import rootReducer from 'redux/reducer';

const store = createStore(
  rootReducer,
  compose(
    (state = {}) => state,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

export default store;
