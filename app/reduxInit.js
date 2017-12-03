import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import loginSaga from './login/loginSaga'

import { combineReducers } from 'redux';
import {loginActionsHandler} from './login/loginActions';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  login: loginActionsHandler,
});

const composeEnhancers = compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
);

sagaMiddleware.run(loginSaga);
