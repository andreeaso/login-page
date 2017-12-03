/* this just simulates a response from server. In order to see how an error would be handled this just rejects if the
   password contains the word 'error' */
function login (credentials) {
  return new Promise((resolve, reject) => {
    if(credentials.password.indexOf('error') >= 0) {
      reject('Something went wrong. Please verify your credentials');
      return;
    }
    setTimeout(() => {
      const user = {name: credentials.username};
      localStorage.setItem('user', JSON.stringify(user));
      resolve(user)
    }, 500)
  })
}

function logout() {
  localStorage.removeItem('user');
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  }catch(e) {
    console.log(e);
    return {}
  }
}

export const loginService = {
  login,
  logout,
  getCurrentUser
}
