import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { login } from './login';
// import { userLoginRequest } from './loginActions';


class LoginPage extends React.Component {
  render() {
    // const { userLoginRequest } = this.props;
    return (
      <div className="ui grid">
        <div className="ui four column centered grid">
          <div className="column">
            <LoginForm/>
          </div>
        </div>
      </div>
    );
  }
}


export default LoginPage;
