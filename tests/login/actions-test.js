import expect from 'expect'
import {loginActionsHandler as reducer} from 'login/loginActions'
import * as types from '../../app/login/loginTypes'

describe('Login reducer', () => {
  const initialState = {
    loginErrorMessage: '',
    isLoginLoading:false,
    user: {}
  };

  const testCredentials = {username: 'test', password: 'test'};
  const testUser = {name: 'test'};

  it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
  });

  it(`should handle ${types.ATTEMPT_LOGIN}`, () => {
    expect(
        reducer(undefined, {type: types.ATTEMPT_LOGIN})
    ).toEqual({...initialState, isLoginLoading: true})
  });

  it(`should handle ${types.LOGIN_SUCCESS}`, () => {
    expect(
        reducer(undefined, {type: types.LOGIN_SUCCESS, user: testUser})
    ).toEqual({...initialState, user: testUser})
  });

  it(`should handle ${types.LOGOUT}`, () => {
    expect(
        reducer(undefined, {type: types.LOGOUT})
    ).toEqual({...initialState})
  });

  it(`should handle ${types.LOGIN_FAILED}`, () => {
    expect(
        reducer(undefined,  {type: types.LOGIN_FAILED, error: 'error message'})
    ).toEqual({...initialState, loginErrorMessage: 'error message'})
  });
})
