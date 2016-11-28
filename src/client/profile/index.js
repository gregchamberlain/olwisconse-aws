import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const Profile = ({ data, mutate, client }) => {

  const logout = () => {
    mutate().then(() => {
      client.resetStore();
    }).catch(err => {
      console.error('Failed Logout', err);
    });
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const LOGOUT_MUTATION = gql`mutation Logout {
  logout {
    id
  }
}`;

export default withApollo(graphql(LOGOUT_MUTATION)(Profile));
