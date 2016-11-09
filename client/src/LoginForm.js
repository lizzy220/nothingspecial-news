import React from 'react';
import {  browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { login } from './login';
import validateInput from './validateInput';
import { Link } from 'react-router';



class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
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
      this.props.login(this.state).then(
        ( res ) => browserHistory.push('/home'),
        ( err ) => this.setState({errors: err.response.data.errors, isLoading: false})
      );
    }
  }

  render() {
    const errors = this.state.errors;
    return (
      <form className="ui form" onSubmit={this.onSubmit}>
        <h1>Login</h1>
        {errors.form && <div className="ui red message">{errors.form}</div>}
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
          <button className="ui primary button">Login</button>
          
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

export default connect(null, { login })(LoginForm);