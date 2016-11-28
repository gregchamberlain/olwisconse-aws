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
    this.props.login(this.state).then(({ data }) => {
      console.log('yay!', data);
    }).catch(err => console.error(err));
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

const mutation = gql`mutation Login($user: UserInput!) {
    login(user: $user) {
      id
      username
    }
}`;

export default graphql(mutation, {
  props({ mutate }) {
    return {
      login(user) {
        return mutate({
          variables: { user },
          updateQueries: {
            CurrentUser: (prev, { mutationResult }) => {
              const currentUser = mutationResult.data.login;
              return { currentUser };
            }
          }
        });
      }
    };
  }
})(Login);
