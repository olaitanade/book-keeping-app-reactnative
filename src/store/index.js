import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const middlewares = [thunk, logger];

const initialState = {};

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));

export default store;