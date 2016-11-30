import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ProfilePicture from './ProfilePicture';
import currentUserQuery from '../graphql/currentUser.gql';

const Profile = ({ data, mutate, client }) => {

  const logout = () => {
    mutate().then(() => {
      client.resetStore();
    }).catch(err => {
      console.error('Failed Logout', err);
    });
  };

  return data.loading ? <div>Loading...</div> : (
    <div>
      <ProfilePicture image={data.currentUser.profilePicture || {}}/>
      <h1>{data.currentUser.displayName}<small> - @{data.currentUser.username}</small></h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const LOGOUT_MUTATION = gql`mutation Logout {
  logout {
    id
  }
}`;

export default withApollo(graphql(currentUserQuery)(graphql(LOGOUT_MUTATION)(Profile)));
