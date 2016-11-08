import React from 'react';
import LoginForm from './LoginForm';
// import { connect } from 'react-redux';
// import { login } from './login';
// import { userLoginRequest } from './loginActions';
import { Link } from 'react-router';


class LoginPage extends React.Component {
  render() {
    // const { userLoginRequest } = this.props;
    return (
      <div className="ui grid">
        <div className="ui four column centered grid">
          <div className="column">
            <div className="row">
              <LoginForm/>
            </div>
            <p>   </p>
            <div className="row">
              <button className="ui button"><Link to={`/signup`}>Sign Up</Link></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default LoginPage;
