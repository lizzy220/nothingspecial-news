import React from 'react';
import {  browserHistory } from 'react-router';
import validateInput from './validateInput';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => browserHistory.push('/'),
        // ({data} => this.setState( {errors: data} ))
        ( err ) => this.setState({errors: err.response.data, isLoading: false})
      );
    }
  }

  render() {
    const errors = this.state.errors;
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
          {errors.username && <div className="ui pointing red basic label">{errors.username}</div>}
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
          />
          {errors.password && <div className="ui pointing red basic label">{errors.password}</div>}
        </div>
        <div>
          <button disabled={this.state.isLoading} className="ui primary button">Sign Up</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
