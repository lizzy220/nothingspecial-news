import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from './signupActions';


class SignupPage extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="ui grid">
        <div className="ui four column centered grid">
          <div className="column">
            <SignupForm userSignupRequest={userSignupRequest}/>
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}


export default connect(null, { userSignupRequest })(SignupPage);
