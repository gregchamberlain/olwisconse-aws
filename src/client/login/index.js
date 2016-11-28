import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  submit = e => {
    e.preventDefault();
    console.log(this.state);
  }

  update = name => e => {
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <h1>Login</h1>
        <div>
          <label>Username</label>
          <input type="text" onChange={this.update('username')} value={this.state.username} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" onChange={this.update('password')} value={this.state.password} />
        </div>
        <button>Login</button>
      </form>
    );
  }
}

const mutation = gql`mutation Login(user: UserInput!)

`;

export default Login;
