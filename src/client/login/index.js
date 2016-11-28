import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './style.css';

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
      <div className={styles.background}>
        <form onSubmit={this.submit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="Username"
            type="text"
            onChange={this.update('username')}
            value={this.state.username}
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            onChange={this.update('password')}
            value={this.state.password}
          />
          <button className={styles.button}>Login</button>
        </form>
      </div>
    );
  }
}

const mutation = gql`mutation Login($user: UserInput!) {
    login(user: $user) {
      id
      username
      displayName
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
