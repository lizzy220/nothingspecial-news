import React from 'react';

class LoginForm extends React.Component {
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

    console.log(this.state);
  }

  render() {

    return (
      <div className="ui grid">
        <div className="ui four column centered grid">
          <div className="column">
            <form className="ui form" onSubmit={this.onSubmit}>
              <h1>Login</h1>
              <div className="field">
                <label>Username</label>
                <input
                  value={this.state.username}
                  onChange={this.onChange}
                  type="text"
                  name="username"
                  className="ui input focus"
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  type="text"
                  name="password"
                />
              </div>
              <div>
                <button className="ui primary button">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default LoginForm;
