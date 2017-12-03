import {handleActions} from 'redux-actions';
import {loginService} from './loginService'
import * as types from './loginTypes'

export const attemptLogin = (credentials) => ({type: types.ATTEMPT_LOGIN, credentials});
export const setUser = (user) => ({type: types.LOGIN_SUCCESS, user});
export const loginFailed = (error) => ({type: types.LOGIN_FAILED, error});
export const logout = () => ({type: types.LOGOUT})

export const loginActionsHandler = handleActions({
  [types.ATTEMPT_LOGIN]: (state) => ({...state, loginErrorMessage: '', isLoginLoading: true}),
  [types.LOGIN_SUCCESS]: (state, action) => ({...state, isLoginLoading: false, user: action.user}),
  [types.LOGIN_FAILED]: (state, action) => ({...state, isLoginLoading: false, loginErrorMessage: action.error}),
  [types.LOGOUT]: (state) => ({...state, user: {}})
}, {loginErrorMessage: '', isLoginLoading:false, user: loginService.getCurrentUser()});
