import { takeLatest, all, put, call } from 'redux-saga/effects';
import {setUser, loginFailed} from './loginActions'
import {loginService} from './loginService'
import * as types from './loginTypes'

export function * login ({credentials}) {
  try {
    const user = yield call(loginService.login, credentials);
    yield put(setUser(user));
  }catch(e) {
    console.log(e);
    yield put(loginFailed(e))
  }
}

export function * logout () {
  loginService.logout();
}

export default function* loginSaga() {
  yield all([
    takeLatest(types.ATTEMPT_LOGIN, login),
    takeLatest(types.LOGOUT, logout),
  ]);
}
