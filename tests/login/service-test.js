import expect from 'expect'
import {loginService} from 'login/loginService'
import sinon from 'sinon';

global.window.localStorage = {setItem: () => {}, getItem: () => {return {}}};

describe('Login service', () => {
  const testCredentials = {username: 'test', password: 'test'};
  const testUser = {name: 'test'};

  it('should successfully login a user', () => {
    sinon.spy(global.window.localStorage, 'setItem');
    return loginService.login(testCredentials).then((user) => {
      expect(user).toEqual(testUser)
    });
  });

  it('should return an error message if the password is not correct', () => {
    return loginService.login(testCredentials)
        .then(() => {})
        .catch((e) => {
          expect(e).toEqual('Something went wrong. Please verify your credentials');
        })
  });

})
