import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    };
  }

  submit = e => {
    e.preventDefault();
    const { errors, ...user } = this.state;
    this.props.login(user).then(({ data }) => {
      console.log('yay!', data);
    }).catch(err => {
      this.setState({ errors: err.graphQLErrors });
    });
  }

  update = name => e => {
    this.setState({ [name]: e.target.value });
  }

  render() {
    const { username, password, errors } = this.state;
    return (
      <div className={styles.background}>
        <form onSubmit={this.submit} className={styles.form}>
          { errors && errors.map((error, idx) => (
            <div key={`error-${idx}`} className={styles.error}>
              {error.message}
            </div>
          ))}
          <input
            className={styles.input}
            placeholder="Username"
            type="text"
            onChange={this.update('username')}
            value={username}
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            onChange={this.update('password')}
            value={password}
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
      profilePicture {
        id
        url
      }
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
