import React, { Component } from 'react';
import {connect} from 'react-redux';
import {attemptLogin, logout} from './loginActions'
import './login.scss'
import userImage from '../images/user.png'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {username: '', password: ''}
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value, errors: {...this.state.errors, [name]: ''}});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.isFormValid()) {
      this.props.login({username: this.state.username, password: this.state.password});
    }
  };

  logout = () => {
    this.setState({username: '', password: ''});
    this.props.logout();
  }

  isFormValid = () => {
    const usernameMessage = this.state.username.length === 0 ? 'This field is required.' : '';
    const passwordMessage = this.state.password.length < 6 ? 'The password must have at least 6 characters' : '';
    this.setState({errors: {username: usernameMessage, password: passwordMessage}});
    return !(usernameMessage || passwordMessage);

  }

  render () {
    const {username, password, errors} = this.state;
    const {user, isLoginLoading, loginErrorMessage} = this.props;
    return (
        <div className="login">
          { user && user.name
              ? <div>
                <h3>Hello <span className="user">{user.name}</span> how are you doing today?</h3>
                  <span className="link" onClick={this.logout}>Logout</span>
                </div>
            : <div className="form-container">
                <img className="icon" src={userImage}/>
                <div className="login-form" noValidate>
                <form onSubmit={this.handleSubmit}>
                  <div className="field-group">
                    <label className="form-label" htmlFor="username">Username:</label>
                    <input type="text" name="username" value={username} onChange={this.handleChange} className={`${errors.username ? 'error-field': ''}`} />
                    {errors.username && <div className="error-label">{errors.username}</div>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input type="password" name="password" value={password} onChange={this.handleChange} className={`${errors.password ? 'error-field': ''}`} />
                    {errors.password && <div className="error-label">{errors.password}</div>}
                  </div>
                  <div className="button-wrapper">
                    {!isLoginLoading && <button className="button-submit">Login</button>}
                    {isLoginLoading && <div className="loader" />}
                    <a className="text-link" href="/">Forgot password?</a>
                  </div>
                </form>
                {loginErrorMessage && <div className="error">{loginErrorMessage}</div>}
              </div>
            </div>
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  isLoginLoading: state.login.isLoginLoading,
  loginErrorMessage: state.login.loginErrorMessage
});

const mapDispatchToProps = dispatch => ({
  login: (credentials) => dispatch(attemptLogin(credentials)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);