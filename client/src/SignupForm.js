import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data){
  let errors = {};
  if(Validator.isEmpty(data.username)){
    errors.username = 'This field is required';
  }
  if(Validator.isEmpty(data.password)){
    errors.password  = 'This field is required';
  }
  return{
    errors,
    isValid: isEmpty(errors)
  }
}

var error = {};

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  onSubmit(e) {
    e.preventDefault();
    this.setState({});
    const { errors, isValid } = validateInput(this.state);
    // console.log(errors);
    // console.log(this.state);
    error = errors;
    if(isValid){
      this.props.userSignupRequest(this.state);
    }
  }

  render() {
    const errors = error;
    console.log(errors);
    return (
      <form className="ui form" onSubmit={this.onSubmit}>
        <h1>Sign Up</h1>
        <div className="field">
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            className="ui input focus"
          />
          {errors.username && <span className="">{errors.username}</span>}
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="text"
            name="password"
          />
          {errors.username && <span className="">{errors.username}</span>}
        </div>
        <div>
          <button className="ui primary button">Sign Up</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
